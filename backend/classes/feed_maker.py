from classes.logger import Logger
from datetime import datetime
from audionews.models import Article, Category
from classes.recommender import Recommender
from classes import CategoryEnum, MetricEnum
import pandas as pd


class FeedMaker:
    def __init__(self, metric: MetricEnum):
        self.metric = metric
        self.prioritizer = Recommender(metric)
        self.logger = Logger("feed_maker").logger

    def load_articles(self, date_from: datetime) -> pd.DataFrame:
        article_dicts = Article.objects \
            .filter(pub_date__gte=date_from) \
            .all().values()

        category_mapping = {d['id']: d['name'] for d in Category.objects.all().values()}

        articles_df = pd.DataFrame(article_dicts)
        articles_df['category'] = articles_df['category_id'].apply(lambda x: category_mapping[x])
        return articles_df

    def create_playlists(self, date_from: datetime):
        self.articles = self.load_articles(date_from)
        for category in CategoryEnum:
            self.fill_category_feed(category)

    def fill_category_feed(
            self, category: CategoryEnum
    ):
        mask = self.articles["category"] == category.value
        category_articles = self.articles[mask]
        self.prioritizer.prioritize_articles(
            category_articles
        )



