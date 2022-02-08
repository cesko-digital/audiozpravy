import argparse
import datetime
import logging
import time
from typing import List, Optional

import django
import os

from classes.categorizer import parse_ctidoma_category
from job_runner.tts import process_audio, upload_to_s3

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
    def __init__(self):
        self.new_entries = []
        self.logger = logging.getLogger('Job Runner')

    def get_new_articles(self, sources_names: List[str] = None):
        """ Get new articles from feed"""
        self.logger.info('Getting new articles from ctidoma feed')

        entries = []

        for source in SOURCES:
            if not sources_names:
                self.logger.info(f'Scrapin data for {source["name"]}')
                entries.extend(_scrape_feed(source, local_dev=0))
            elif source['name'] in sources_names:
                self.logger.info(f'Scrapin data for {source["name"]}')
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
                recording_created_at=datetime.datetime.now(),
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



    def create_playlists(self, create_for_date: datetime.date, date_from: datetime.date):
        """
        Create playlist by google trend

        :param create_for_date: date form which are playlist created
        :param date_from: date from which are articles recommended
        """
        self.logger.info('Calculating playlists')
        feed = FeedMaker(MetricEnum.FRECENCY, create_for_date)
        feed.create_playlists(date_from)


    def train_w2v_model(self, model_path):
        """ Training doc2vec model based on all articles"""
        self.logger.info(f'Training doc2vec model and saving into path: {model_path}')
        train_w2v_model(model_path)


    def save_embeddings(self, bert_folder_path, vectors_path):
        """
        calculates and seves embeddings from all vectors based on trained model on 'doc2vec_path' and saves results
        int 'vectors_path'
        """
        self.logger.info(f'Creating embeddings and saving into {vectors_path}')
        calculate_bert_vectors(bert_folder_path, vectors_path)

    def add_audio_for_new_entries(self, path_audio_output: str ):
        ''' Adds audio fo each new entry and saves it into s3 file'''
        if os.getenv('AZURE_KEY') and os.getenv('AZURE_REGION'):

            self.logger.info(f'Creating audio for {len(self.new_entries)} articles')
            os.makedirs(path_audio_output, exist_ok=True)
            for new_article in self.new_entries:
                process_audio(new_article['title'], new_article['perex'], path_audio_output)

            if os.getenv('AWS_ACCESS_KEY') and os.getenv('AWS_SECRET_KEY') and os.getenv('S3_BUCKET') and os.getenv('S3_BUCKET_AUDIO'):
                self.logger.info(f'Uplading {len(self.new_entries)} files into s3')
                upload_to_s3(path_audio_output)
            else:
                self.logger.warning('Environment variables AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET and S3_BUCKET_AUDIO'
                                'needs to be defined in order to save files into s3')
        else:
            self.logger.warning('Environment variables AZURE_KEY and AZURE_REGION needs toi be defined in order to '
                                'process audio')


def strtolist(string, sep=',') -> Optional[List[str]]:
    return string.split(sep) if string != '' else None


if __name__ == '__main__':
    "Regular jobs that run on a daily basis. Script runs all the jobs 30 minutes after midnight each day "
    args = argparse.ArgumentParser()
    args.add_argument('--bert-path', default='job_runner/data/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt')
    args.add_argument('--vectors-path', default='job_runner/data/articles_embeddings.json')
    args.add_argument('--audio-path', default='job_runner/data/audio/')
    args.add_argument('--n-past-days', default=100000,
                      help = 'Number of days to consider for articles to recommend for categories. for value 4 we '
                             'consider only articles in last 4 days.')
    args.add_argument('--sources_names', default='ctidoma.cz', type=strtolist,
                      help='all sources names that will be scraped by the script. If empty string is given, we '
                           'scrape all available sources. Sources are separated by ",". To view all available sources'
                           'see job_runner.rss_scraper.rss_scraper.SOURCES ')

    cfg = args.parse_args()
    date_today = datetime.date.today()
    runner = JobRunner()
    runner.get_new_articles(sources_names=cfg.sources_names)
    date_in_past = (datetime.datetime.now() - datetime.timedelta(days=cfg.n_past_days)).date()
    runner.create_playlists(date_today, date_in_past)
    runner.save_embeddings(cfg.bert_path, cfg.vectors_path)
    runner.add_audio_for_new_entries(cfg.audio_path)
