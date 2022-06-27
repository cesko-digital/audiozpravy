import argparse
import datetime
import logging
import time
from typing import List, Optional

import django
import os

from django.db.models import Count

from classes.categorizer import parse_ctidoma_category
from job_runner.tts import process_audio, upload_file_to_s3

from recommender.save_embeddings import calculate_doc2vec_vectors, calculate_bert_vectors
from recommender.train_doc2vec import train_w2v_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

from classes.categorizer import parse_category
from audionews.models import Article, Provider, Category
from classes import CategoryEnum, MetricEnum
from classes.feed_maker import FeedMaker
from job_runner.sources import SOURCES
from job_runner.scraper import _scrape_feed
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

CTIDOMA_SOURCE = {
        "name": "ctidoma.cz",
        "feeds": [
            {
                "url": "https://www.ctidoma.cz/export/cesko-digital",
                "category": parse_ctidoma_category,
            }
        ],
    }

class JobRunner:
    def __init__(self, path_audio_output: str="job_runner/data/audio/",
                 vectors_path="job_runner/data/articles_embeddings.json"):
        self.path_audio_output = path_audio_output
        self.vectors_path = vectors_path
        self.new_entries = []
        self.logger = logging.getLogger('Job Runner')
        self.mock_audio_path = 'audio/gandalf_shallnotpass.mp3'

    def get_new_articles(self, sources_names: List[str] = None, **kwargs):
        """ Get new articles from feed"""
        self.logger.info('Getting new articles from ctidoma feed')

        entries = []

        for source in SOURCES:
            if not sources_names:
                self.logger.info(f'Scraping data for {source["name"]}')
                entries.extend(_scrape_feed(source, local_dev=0))
            elif source['name'] in sources_names:
                self.logger.info(f'Scraping data for {source["name"]}')
                entries.extend(_scrape_feed(source, local_dev=0))

        for entry in entries:
            provider, create = Provider.objects.get_or_create(name=entry['source'])
            cat = parse_category(str(entry['link']))
            if not cat:
                logging.info(f'Nonetype category value for link: {entry["link"]} and source {entry["source"] }')
                continue
            category, create = Category.objects.get_or_create(name=cat.value.name, key=cat.value.key)
            article, created = Article.objects.get_or_create(
                category=category,
                title=entry["title"],
                perex=entry['summary'],
                pub_date=datetime.datetime(
                    entry["published"].tm_year, entry["published"].tm_mon, entry["published"].tm_mday,
                    entry["published"].tm_hour, entry["published"].tm_min, entry["published"].tm_sec
                ),
                url=str(entry['link']),
                provider=provider,
                text=f'{entry["title"]}: {entry["summary"]}'
            )
        self.logger.info(f'Adding {len(entries)} articles into db fro ctidoma')
        self.new_entries.extend(entries)

    def delete_duplicate_articles(self, **kwargs):
        duplicate_urls = Article.objects.values("url").annotate(duplicate_count=Count('url')).values("url").filter(duplicate_count__gt=1)
        for duplicate_url in duplicate_urls:
            duplicate_articles_for_url = Article.objects.filter(url=duplicate_url["url"])
            article_id_to_keep = duplicate_articles_for_url.latest('id').id
            duplicate_articles_for_url.exclude(id=article_id_to_keep).delete()
        remaining_count = Article.objects.values("url").annotate(duplicate_count=Count('url')).values("url").filter(duplicate_count__gt=1).count()
        print("Remaining count of duplicate articles:", remaining_count)

    def create_playlists(self, **kwargs):
        """
        Create playlist by google trend

        :param create_for_date: date form which are playlist created
        :param date_from: date from which are articles recommended
        """
        self.logger.info('Calculating playlists')
        feed = FeedMaker(MetricEnum.FRECENCY, date=kwargs["create_for_date"])
        feed.create_playlists(kwargs["date_from"])


    def train_w2v_model(self, model_path, **kwargs):
        """ Training doc2vec model based on all articles"""
        self.logger.info(f'Training doc2vec model and saving into path: {model_path}')
        train_w2v_model(model_path)


    def save_embeddings(self, **kwargs):
        """
        calculates and seves embeddings from all vectors based on trained model on 'doc2vec_path' and saves results
        int 'vectors_path'
        """
        self.logger.info(f'Creating embeddings and saving into {self.vectors_path}')
        calculate_bert_vectors(self.vectors_path)

    def add_audio_for_new_entries(self, **kwargs):
        ''' Adds audio for each new entry and saves it into s3 file'''
        for new_article in self.new_entries:
            if os.getenv('AZURE_KEY') and os.getenv('AZURE_REGION'):
                self.logger.info(f'Creating audio for {len(self.new_entries)} articles')
                os.makedirs(self.path_audio_output, exist_ok=True)
                filename = process_audio(new_article['title'], new_article['perex'], self.path_audio_output)
                path_audio_output = os.path.join(self.path_audio_output, filename)

                if os.getenv('AWS_ACCESS_KEY') and os.getenv('AWS_SECRET_KEY') and os.getenv('S3_BUCKET') and os.getenv(
                        'S3_BUCKET_AUDIO'):
                    self.logger.debug(f'Uploading {len(self.new_entries)} files into s3')
                    upload_file_to_s3(path_audio_output)
                    new_article.update(recording_url='s3:/' + path_audio_output)
                else:
                    self.logger.debug(
                        'Environment variables AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET and S3_BUCKET_AUDIO'
                        'needs to be defined in order to save files into s3')
                    new_article.update(recording_url=path_audio_output)

            else:
                self.logger.debug(f'Environment variables AZURE_KEY and AZURE_REGION are not defined. Mocking audio url '
                                  f'for file with title {new_article["title"]}')
                new_article.update(recording_url=self.mock_audio_path)

def strtolist(string, sep=',') -> Optional[List[str]]:
    return string.split(sep) if string != '' else None

