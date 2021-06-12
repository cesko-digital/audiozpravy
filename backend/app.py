from flask import Flask, render_template
import pandas as pd
import numpy as np
from typing import List, Dict
from datetime import datetime, timedelta
from babel.dates import format_timedelta, format_date
from collections import namedtuple
from flask_restful import Resource, Api

import time
import threading


ARTICLES_REFRESH = 900  # 15 min

app = Flask(__name__)
api = Api(app)

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

lock = threading.Lock()


def periodic_update():
    # possibly more robust solution https://networklore.com/start-task-with-flask/
    def background_job():
        """
        load necessary data for articles feed and save them as global vars
        """
        while True:
            global articles
            global X
            global words
            articles_new = pd.read_csv("s3_input/articles.csv")
            X_new = np.load("s3_input/X.npy", allow_pickle=True)
            words_new = np.load("s3_input/words.npy", allow_pickle=True)

            # TODO: check to make sure if this lock is enough to prevent access
            # to different versions of these variables as given time
            with lock:
                articles = articles_new
                X = X_new
                words = words_new

            time.sleep(ARTICLES_REFRESH)

    thread = threading.Thread(target=background_job)
    thread.start()


def pretty_format_date(date: datetime) -> str:
    delta = datetime.now() - date

    if delta < timedelta(days=7):
        return format_timedelta(delta, locale='cs_CZ')
    elif date > datetime(year=datetime.now().year, month=1, day=1):
        return format_date(date, "d. MMMM", locale='cs_CZ')
    else:
        return format_date(date, "d. MMMM y", locale='cs_CZ')


def format_articles(selected_articles: pd.DataFrame) -> pd.DataFrame:
    # TODO: resolve feedparser time format elsewhere
    selected_articles["published"] = selected_articles["published"].map(
        lambda x: eval(x.replace("time.struct_time", "FeedparserTime"))
    )
    selected_articles["published"] = pd.to_datetime(
        selected_articles.published.map(tuple).map(lambda x: datetime(*x[:5]))
    )
    selected_articles["published"] = selected_articles["published"].map(pretty_format_date)

    return selected_articles


def select_based_on_recency(articles: pd.DataFrame) -> List[Dict]:
    # TODO: add other types of recommendation
    selected_articles = (
        articles.sort_values("published", ascending=False)
                .iloc[:20][["title", "link", "summary", "published", "category"]]
    )
    return format_articles(selected_articles).to_dict("records")


@app.route("/")
def feed():
    payload = select_based_on_recency(articles)

    return render_template("feed.html", articles=payload)


class FeedRest(Resource):
    def get(self):
        payload = select_based_on_recency(articles)
        return payload


api.add_resource(FeedRest, "/feed")


if __name__ == "__main__":
    periodic_update()
    app.run()  # debug=True
