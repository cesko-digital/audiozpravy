import pytz
from datetime import datetime
from typing import Dict, List
import pandas as pd
import numpy as np
from classes.metrics import calculate_frecency, calculate_age_in_secs
from classes.trend_watcher import TrendWatcher
from classes import MetricEnum
ARTICLE_PROPS = ["title", "link", "summary", "published", "category", "audio"]

class Prioritizer:
    def __init__(self, metric: MetricEnum):
        METRICS = {
            MetricEnum.FRECENCY: self.frecency,
            MetricEnum.RECENCY: self.recency
        }
        self.timezone = pytz.timezone("Europe/Prague")
        self.method = METRICS[metric]
        self.age_limit_in_secs = 4 * 3600

    def recommend(self, articles: pd.DataFrame):
        articles_age = calculate_age_in_secs(articles)
        article_popularity = self.popularity(articles, words_in_article)

        top_articles = self.method(articles)
        top_ids = top_articles.argsort()[::-1][:20]
        return articles.iloc[top_ids[:20], :][ARTICLE_PROPS]

        # recent defined as newer than 4 hours
        recent = articles.index[articles_age < self.age_limit_in_secs]
        # trending defined as roughly one std above average article popularity
        trending = articles.index[article_popularity.T.squeeze() > 200]

    def get_relevant_words(self, tf_idf_matrix, words, row_id):
        row = tf_idf_matrix.getrow(row_id).toarray().squeeze()
        # (row != 0).sum() ... make top N variable?
        top_matches = row.argsort()[::-1][:10]
        return words[top_matches], row[top_matches]


    def popularity(self, articles_words_matrix, words_in_article):
        daily_trends = TrendWatcher.get_daily_google_trends()
        popularity = np.zeros((articles_words_matrix.shape[0], 1))

        for top_trend in self.daily_trends:
            value = top_trend["summary"] + " " + top_trend["value"]
            trend_words = value.replace(",", "").split()
            matches = np.where(np.isin(words_in_article, trend_words))[0]
            traffic_score = int(top_trend["traffic"].replace(",", "").replace("+", ""))
            popularity += articles_words_matrix[:, matches].sum(axis=1) * traffic_score

        popularity /= len(self.daily_trends)
        return popularity + 1

    def recency(self, articles):
        most_recent_articles = articles.sort_values("published", ascending=False).iloc[:20]
        return most_recent_articles[ARTICLE_PROPS]

    def frecency(self, articles):
        popularity = self.popularity(X_for_feed, words)
        return np.squeeze(np.asarray(calculate_frecency(popularity.T, calculate_age_in_secs(articles))))







