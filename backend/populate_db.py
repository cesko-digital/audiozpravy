from datetime import datetime
from random import random
from classes.helper import category_mapper
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()
from django.contrib.auth.models import Permission
from collections import defaultdict
import recommender.recommend
import pandas as pd
from classes.categorizer import parse_category
from audionews.models import Provider, Category, Article, Listener, Playlist, Play
from classes import CategoryEnum

DEVICE_ID = "abcd"
MOCKED_AUDIO_PATH = 'job_runner/audio/gandalf_shallnotpass.mp3'

if __name__ == '__main__':
    """ Add data from pandas df into sqlite database"""
    # articles = pd.read_csv('s3_input/articles.csv')
    articles_new = pd.read_csv("job_runner/data/articles.csv", parse_dates=["published"])
    articles_new['published'] = articles_new.published.apply(recommender.recommend.to_timestamp)
    django.setup()

    listener, created = Listener.objects.get_or_create(device_id=DEVICE_ID, username=DEVICE_ID)
    permission = Permission.objects.get(name='Can change user')
    listener.user_permissions.add(permission)
    listener.set_password(DEVICE_ID)
    listener.save()

    for cat in CategoryEnum:
        category, create = Category.objects.get_or_create(name=cat.value.name, key=cat.value.key)

    articles_for_category_count = defaultdict(lambda: 0)
    for index, row in articles_new.iterrows():
        cat = parse_category(str(row.link))
        provider, create = Provider.objects.get_or_create(name=row.source)
        category, create = Category.objects.get_or_create(name=cat.value.name, key=cat.value.key)
        article = Article.objects.create(
            category=category,
            title=row.title,
            perex=row.summary,
            pub_date=datetime.now(),
            recording_url=MOCKED_AUDIO_PATH,
            url=str(row.link),
            provider=provider,
            text=row.lemmatized_text
        )
        articles_for_category_count[row.category] += 1
        playlist, created = Playlist.objects.get_or_create(
            category=category,
            prepared_for_date = datetime.today(),
            type="Day"
        )
        if articles_for_category_count[row.category] <= 9:
            playlist.articles.add(article)
        playlist, created = Playlist.objects.get_or_create(
            category=category,
            prepared_for_date = datetime.today(),
            type="Week"
        )
        if articles_for_category_count[row.category] <= 8:
            playlist.articles.add(article)

        if random() > 0.9:
            play, created = Play.objects.get_or_create(
                article=article,
                listener=listener
            )



