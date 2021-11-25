from collections import namedtuple

import pytz
from datetime import datetime
import time
from math import e, log
from typing import Dict, List
from cachetools import cached, TTLCache
import pandas as pd

import feedparser
import numpy as np

FeedparserTime = namedtuple(
    "FeedparserTime",
    [
        "tm_year",
        "tm_mon",
        "tm_mday",
        "tm_hour",
        "tm_min",
        "tm_sec",
        "tm_wday",
        "tm_yday",
        "tm_isdst",
    ],
)


def to_timestamp(value: str):
    """ Translates FeedparserTime string into datetime.timestamp format"""
    x: FeedparserTime = eval(value)
    datetime_value = datetime(year=x.tm_year, month=x.tm_mon, day=x.tm_mday, hour=x.tm_hour)
    return datetime.timestamp(datetime_value)


def recommend_by_google_trends(n_of_recommendations: int = 20) -> pd.DataFrame:
    """ Recommend articles based on current google trends.
    Returns dataframe with fields: ['title', 'link', 'summary', 'published', 'category', 'audio', 'badges'"""

    #TODO: add all articles to s3 and remove the dependency on pandas df
    articles_new = pd.read_csv("s3_input/articles.csv", parse_dates=["published"])
    articles_new['published'] = articles_new.published.apply(to_timestamp)

    #TODO: calculate vectors from w2v on the go and remove the dependency on saved x matrix
    X_new = np.load("s3_input/X.npy", allow_pickle=True).tolist()
    words_new = np.load("s3_input/words.npy", allow_pickle=True)

    results = recommend(articles_new, X_new, words_new, n_of_recommendations)
    return results


def get_relevant_words(tf_idf_matrix, words, row_id):
    row = tf_idf_matrix.getrow(row_id).toarray().squeeze()
    # (row != 0).sum() ... make top N variable?
    top_matches = row.argsort()[::-1][:10]
    return words[top_matches], row[top_matches]


# relevant_words, scores = get_relevant_words(tf_idf_matrix, words, 80)

@cached(cache=TTLCache(maxsize=2, ttl=1800))
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
    return np.multiply(70 + np.log(popularity), np.exp(-lambda_const * age))


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
        #     article_w2v_words = set(get_relevant_words(tf_idf_matrix, words, 0)[0]).intersection(word_set)
        #     print(trend_w2v_words)
        #     print(article_w2v_words)
        #     res = wv_from_bin.n_similarity(trend_w2v_words, article_w2v_words)
        #     print(res)
        #     break

        popularity += X[:, matches].sum(axis=1) * traffic_score

    popularity /= len(daily_trends)
    return popularity



def recommend(articles, X, words, n_of_recommendations = 20):
    print("getting daily trends")
    daily_trends = get_daily_google_trends()
    popularity = estimate_popularity(daily_trends, X, words) + 1

    tz = pytz.timezone("Europe/Prague")
    now_timestamp = datetime.timestamp(datetime.now(tz))
    age = now_timestamp - articles.published.values.astype(np.int64) / 1e9

    frecency = np.squeeze(np.asarray(calculate_frecency(popularity.T, age)))
    top_ids = frecency.argsort()[::-1][:n_of_recommendations]
    result = articles.iloc[top_ids[:n_of_recommendations], :][
        ["title", "link", "summary", "published", "category", "audio"]
    ]
    result["badges"] = "x"

    # recent defined as newer than 4 hours
    recent = articles.index[age < 4 * 3600]

    # trending defined as roughly one std above average article popularity
    trending = articles.index[popularity.T.squeeze() > 200]
    badges = []
    for row_id in result.index:
        badge_row = []
        if row_id in recent:
            badge_row.append({"name": "Nejnovější", "color": "badge-primary"})
        if row_id in trending:
            print("trending")
            badge_row.append({"name": "Trending", "color": "badge-success"})
        badges.append(badge_row)

    result["badges"] = badges
    return result


def select_based_on_recency(articles: pd.DataFrame) -> List[Dict]:
    # TODO: add other types of recommendation
    selected_articles = articles.sort_values("published", ascending=False).iloc[:20][
        ["title", "link", "summary", "published", "category", "audio"]
    ]
    return selected_articles


