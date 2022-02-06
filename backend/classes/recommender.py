import logging
import math
import pytz
import datetime
import pandas as pd
import numpy as np
from classes.trend_watcher import TrendWatcher
from classes import MetricEnum
from recommender.text_processing import fit_tf_idf

ARTICLE_PROPS = ["title", "url", "perex", "pub_date", "category"]

class Recommender:
    def __init__(self, metric: MetricEnum):
        METRICS = {
            MetricEnum.FRECENCY: self.frecency,
            MetricEnum.RECENCY: self.recency
        }
        self.timezone = pytz.timezone("Europe/Prague")
        self.method = METRICS[metric]
        self.age_limit_in_secs = 4 * 3600
        self.daily_trends = TrendWatcher.get_daily_google_trends()

    def prioritize_articles(self, articles: pd.DataFrame, n_of_articles) -> np.ndarray:
        ''' Prioritizes articles by certain method (frecency or recency) and returns ids of those articles as numpy
        array'''
        tfidf_matrix, words = fit_tf_idf(articles["text"])

        top_articles = self.method(articles, tfidf_matrix, words)
        top_ids = top_articles.argsort()[::-1][:n_of_articles]
        return articles.iloc[top_ids[:n_of_articles], :]['id'].values

    def get_relevant_words(self, tf_idf_matrix, words, row_id):
        row = tf_idf_matrix.getrow(row_id).toarray().squeeze()
        # (row != 0).sum() ... make top N variable?
        top_matches = row.argsort()[::-1][:10]
        return words[top_matches], row[top_matches]


    def popularity(self, articles_words_matrix, words_in_article):
        popularity = np.zeros((articles_words_matrix.shape[0], 1))

        for top_trend in self.daily_trends:
            value = top_trend["summary"] + " " + top_trend["value"]
            trend_words = value.replace(",", "").split()
            matches = np.where(np.isin(words_in_article, trend_words))[0]
            if matches.size == 0:
                logging.Logger('Popularity').info(f'There are no matches for words {trend_words}')
                continue

            traffic_score = int(top_trend["traffic"].replace(",", "").replace("+", ""))
            popularity += articles_words_matrix[:, matches].sum(axis=1) * traffic_score

        popularity /= len(self.daily_trends)
        return popularity + 1

    def recency(self, articles):
        most_recent_articles = articles.sort_values("published", ascending=False).iloc[:20]
        return most_recent_articles[ARTICLE_PROPS]

    def frecency(self, articles, tf_idf_matrix, words):
        """
        see https://wiki.mozilla.org/User:Jesse/NewFrecency
        """
        popularity = self.popularity(tf_idf_matrix, words)
        # how much will be older articles penalized,
        # interpretation: the denominator is number of seconds after which the score halves
        articles_age = self._calculate_age_in_secs(articles)

        lambda_const = math.log(2) / (7 * 24 * 60 * 60)  # 7 days
        frecency_output = np.multiply(70 + np.log(popularity.T).ravel(), np.exp(-lambda_const * articles_age))
        return np.squeeze(np.asarray(frecency_output))


    def _calculate_age_in_secs(self, articles):
        return (datetime.date.today() - articles.pub_date).astype(int)/1e9






