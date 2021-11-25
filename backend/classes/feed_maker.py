from classes.logger import Logger
from datetime import datetime
from audionews.models import Article
from classes.prioritizer import Prioritizer
from classes import CategoryEnum, MetricEnum
import pandas as pd

class FeedMaker:
    def __init__(self, metric: MetricEnum):
        self.metric = metric
        self.prioritizer = Prioritizer(metric)
        self.logger = Logger("feed_maker").logger

    def load_articles(self, date_from: datetime) -> pd.DataFrame:
        article_dicts = Article.objects \
            .filter(pub_date__gte=date_from) \
            .all().values()
        return pd.DataFrame(article_dicts)

    def run(self, date_from: datetime):
        self.articles = self.load_articles(date_from)
        for category in CategoryEnum:
            self.fill_category_feed(category)

    def fill_category_feed(self, category: CategoryEnum):
        mask = self.articles["category"] == category.value
        category_articles = self.articles[mask]
        self.prioritizer.recommend(category_articles)



