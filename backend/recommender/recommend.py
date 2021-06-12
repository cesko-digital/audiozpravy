import time
from math import e, log
from typing import Dict, List

import feedparser
import numpy as np


def get_relevant_words(td_idx_matrix, words, row_id):
    row = td_idx_matrix.getrow(row_id).toarray().squeeze()
    # (row != 0).sum() ... make top N variable?
    top_matches = row.argsort()[::-1][:10]
    return words[top_matches], row[top_matches]


# relevant_words, scores = get_relevant_words(td_idx_matrix, words, 80)


def get_daily_google_trends() -> List[Dict]:
    trend_feed = "https://trends.google.cz/trends/trendingsearches/daily/rss?geo=CZ"
    trends = feedparser.parse(trend_feed)

    top_trends = []
    for item in trends["entries"]:
        top_trends.append(
            {
                "value": item["title"],
                "traffic": item["ht_approx_traffic"],
                "summary": item["summary"],
                "published": item["published_parsed"],
            }
        )
    return top_trends


def calculate_frecency(popularity, age):
    """
    see https://wiki.mozilla.org/User:Jesse/NewFrecency
    """
    # how much will be older articles penalized,
    # interpretation: the denomintaor is number of seconds after which the score halves
    lambda_const = log(2) / (7 * 24 * 60 * 60)  # 7 days
    return np.multiply(popularity, np.exp(-lambda_const * age))


def estimate_popularity(daily_trends, X, words):
    """
    estimate article popularity by trying to match words it contains to daily
    trends
    """
    # init
    popularity = np.zeros((X.shape[0], 1))

    for top_trend in daily_trends:
        value = top_trend["summary"] + " " + top_trend["value"]
        trend_words = value.replace(",", "").split()
        matches = np.where(np.isin(words, trend_words))[0]
        traffic_score = int(top_trend["traffic"].replace(",", "").replace("+", ""))
        # TODO: get more fine-grained similarity with w2v
        #     trend_w2v_words = set(trend_words).intersection(word_set)
        #     article_w2v_words = set(get_relevant_words(td_idx_matrix, words, 0)[0]).intersection(word_set)
        #     print(trend_w2v_words)
        #     print(article_w2v_words)
        #     res = wv_from_bin.n_similarity(trend_w2v_words, article_w2v_words)
        #     print(res)
        #     break

        popularity += X[:, matches].sum(axis=1) * traffic_score

    popularity /= len(daily_trends)
    return popularity


def recommend(articles, X, words):
    daily_trends = get_daily_google_trends()
    popularity = estimate_popularity(daily_trends, X, words)
    age = time.time() - articles.published.map(time.mktime)

    frecency = np.squeeze(np.asarray(calculate_frecency(popularity.T, age.values)))
    top_ids = frecency.argsort()[::-1][:10]
    return articles.iloc[top_ids[:10], 0].values


# td_idx_matrix = X.tocsr()
