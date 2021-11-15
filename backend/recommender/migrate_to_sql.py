import datetime
from collections import namedtuple

import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

import recommender.recommend
import pandas as pd

from audionews.models import Provider, Category, Article


if __name__ == '__main__':
    """ Add data from pandas df into sqlite database"""
    # articles = pd.read_csv('s3_input/articles.csv')
    articles_new = pd.read_csv("s3_input/articles.csv", parse_dates=["published"])
    articles_new['published'] = articles_new.published.apply(recommender.recommend.to_timestamp)
    django.setup()

    for index, row in articles_new.iterrows():
        provider = Provider.objects.create(name=row.source, website_url=str(row.link))
        category_article = Category.objects.create(name=row.category)
        article = Article.objects.create(
            category=category_article,
            title=row.title,
            perex=row.summary,
            recording_created_at=datetime.datetime.now(),
            pub_date=datetime.datetime.fromtimestamp(row.published),
            url=str(row.link),
            provider=provider,
            text=row.lemmatized_text
        )