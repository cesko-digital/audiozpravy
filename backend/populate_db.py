from datetime import datetime
from collections import namedtuple
from random import random

import django
import os

from classes import CategoryEnum
from classes.helper import category_mapper

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

import recommender.recommend
import pandas as pd

from audionews.models import Provider, Category, Article, Listener, Playlist, Play


if __name__ == '__main__':
    """ Add data from pandas df into sqlite database"""
    # articles = pd.read_csv('s3_input/articles.csv')
    articles_new = pd.read_csv("s3_input/articles.csv", parse_dates=["published"])
    articles_new['published'] = articles_new.published.apply(recommender.recommend.to_timestamp)
    django.setup()

    listener, created = Listener.objects.get_or_create(device_id="1")

    for index, row in articles_new.iterrows():

        provider, create = Provider.objects.get_or_create(name=row.source)
        category, create = Category.objects.get_or_create(name=category_mapper(row.category))
        article = Article.objects.get_or_create(
            category=category,
            title=row.title,
            perex=row.summary,
            recording_created_at=datetime.now(),
            pub_date=datetime.now(),
            url=str(row.link),
            provider=provider,
            text=row.lemmatized_text
        )
        playlist, created = Playlist.objects.get_or_create(
            category=category,
            prepared_for_date = datetime.today(),
            type="Day"
        )
        playlist.articles.add(article)

        if random() > 0.9:
            play, created = Play.objects.get_or_create(
                article=article,
                listener=listener
            )



