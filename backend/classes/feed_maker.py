from classes.logger import Logger
from datetime import datetime
from audionews.models import Article, Category, Playlist
from classes.recommender import Recommender
from classes import CategoryEnum, MetricEnum
import pandas as pd


class FeedMaker:
    def __init__(self, metric: MetricEnum, date: datetime.date):
        self.metric = metric
        self.prioritizer = Recommender(metric)
        self.logger = Logger("feed_maker").logger
        self.n_of_articles_recommended = 20
        self.date = date


    def load_articles(self, date_from: datetime) -> pd.DataFrame:
        article_dicts = Article.objects \
            .filter(pub_date__gte=date_from) \
            .all().values()

        category_mapping = {d['key']: d['name'] for d in Category.objects.all().values()}

        articles_df = pd.DataFrame(article_dicts)
        articles_df['category'] = articles_df['category_id'].apply(lambda x: category_mapping[x])
        return articles_df

    def create_playlists(self, date_from: datetime.date):
        self.articles = self.load_articles(date_from)
        for category in CategoryEnum:
            self.fill_category_feed(category)

    def fill_category_feed(
            self, category: CategoryEnum
    ):
        mask = self.articles["category"] == category.value
        category_articles = self.articles[mask]
        if category_articles.shape[0] == 0:
            self.logger.warning(f'There are no articles for category {category}. Skipping category')
            return

        prioritized_articles = self.prioritizer.prioritize_articles(
            category_articles, self.n_of_articles_recommended
        )
        self._save_prioritized_articles(prioritized_articles, category)


    def _save_prioritized_articles(self, prioritized_articles_ids, category):
        ''' Save prioritized articles into database'''
        category = Category.objects.get(name=category.value)
        playlist, created = Playlist.objects.get_or_create(
            category=category,
            prepared_for_date=self.date,
            type="Day"
        )
        if created:
            for article_id in prioritized_articles_ids:
                article = Article.objects.get(id = article_id)
                playlist.articles.add(article)








