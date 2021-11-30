from datetime import datetime
from collections import namedtuple
from random import random
import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()
from collections import defaultdict
import recommender.recommend
import pandas as pd
from classes.categorizer import parse_category
from audionews.models import Provider, Category, Article, Listener, Playlist, Play

if __name__ == '__main__':
    """ Add data from pandas df into sqlite database"""
    # articles = pd.read_csv('s3_input/articles.csv')
    articles_new = pd.read_csv("s3_input/articles.csv", parse_dates=["published"])
    articles_new['published'] = articles_new.published.apply(recommender.recommend.to_timestamp)
    django.setup()

    listener, created = Listener.objects.get_or_create(device_id="1")

    articles_for_category_count = defaultdict(lambda: 0)
    for index, row in articles_new.iterrows():
        provider, create = Provider.objects.get_or_create(name=row.source)
        category, create = Category.objects.get_or_create(name=parse_category(str(row.link)))
        article = Article.objects.create(
            category=category,
            title=row.title,
            perex=row.summary,
            recording_created_at=datetime.now(),
            pub_date=datetime.fromtimestamp(row.published),
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
        if articles_for_category_count[row.category] <= 8:
            playlist.articles.add(article)
        playlist, created = Playlist.objects.get_or_create(
            category=category,
            prepared_for_date = datetime.today(),
            type="Week"
        )
        if articles_for_category_count[row.category] <= 8:
            playlist.articles.add(article)

        if random() > 0.5:
            play, created = Play.objects.get_or_create(
                article=article,
                listener=listener
            )



