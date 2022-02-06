from flask import Flask, render_template
import pandas as pd
import numpy as np
from typing import List, Dict
from datetime import datetime, timedelta
from babel.dates import format_timedelta, format_date
from collections import namedtuple
from flask_restful import Resource, Api
from recommender.recommend import select_based_on_recency, recommend
import boto3
from botocore.exceptions import ClientError
from os import environ

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
    local_dev = environ.get("LOCAL_DEV", 0)
    if not local_dev:
        from config import CONFIG

        session = boto3.Session(
            aws_access_key_id=CONFIG["awsAccessKey"],
            aws_secret_access_key=CONFIG["awsSecretKey"],
        )

        s3_client = boto3.client(
            "s3",
            aws_access_key_id=CONFIG["awsAccessKey"],
            aws_secret_access_key=CONFIG["awsSecretKey"],
        )

        for object in session.resource("s3").Bucket(CONFIG["s3Bucket"]).objects.all():
            try:
                s3_client.download_file(
                    CONFIG["s3Bucket"], object.key, "s3_input/" + object.key
                )
            except:
                print("file not found")

    # possibly more robust solution https://networklore.com/start-task-with-flask/
    def background_job():
        """
        load necessary data for articles feed and save them as global vars
        """
        while True:
            global articles
            global X
            global words
            import os

            print()
            print(f"####: {os.getcwd()}")

            articles_new = pd.read_csv("job_runner/data/articles.csv", parse_dates=["published"])
            X_new = np.load("job_runner/data/X.npy", allow_pickle=True).tolist()
            words_new = np.load("job_runner/data/words.npy", allow_pickle=True)

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
        return format_timedelta(delta, locale="cs_CZ")
    elif date > datetime(year=datetime.now().year, month=1, day=1):
        return format_date(date, "d. MMMM", locale="cs_CZ")
    else:
        return format_date(date, "d. MMMM y", locale="cs_CZ")


def format_articles(selected_articles: pd.DataFrame) -> pd.DataFrame:
    # TODO: resolve feedparser time format elsewhere
    # selected_articles["published"] = selected_articles["published"].map(
    #     lambda x: eval(x.replace("time.struct_time", "FeedparserTime"))
    # )
    # selected_articles["published"] = pd.to_datetime(
    #     selected_articles.published.map(tuple).map(lambda x: datetime(*x[:5]))
    # )
    selected_articles["published"] = selected_articles["published"].map(
        pretty_format_date
    )

    return selected_articles


@app.route("/")
@app.route("/<method>")
@app.route("/<method>/<category>")
def feed(method=None, category=None):
    if category:
        print(f"suggesting for category: {category}")
        print(articles.category.drop_duplicates())
        mask = articles["category"] == category
        articles_for_feed = articles[mask]
        X_for_feed = X[mask]
        print(articles_for_feed.shape)
        print(articles.shape)
    else:
        articles_for_feed = articles
        X_for_feed = X
    if method == "frecency":
        print("started recommending!")
        selected = recommend(articles_for_feed, X_for_feed, words)
    elif not method:
        selected = select_based_on_recency(articles_for_feed)
    else:
        raise Exception("Unknown method!")
    payload = format_articles(selected).to_dict("records")

    local_dev = environ.get("LOCAL_DEV", 0)
    return render_template("feed.html", articles=payload, local_dev=local_dev)


class FeedRest(Resource):
    def get(self):
        selected = select_based_on_recency(articles)
        payload = format_articles(selected).to_dict("records")
        return payload


api.add_resource(FeedRest, "/feed")


if __name__ == "__main__":
    periodic_update()
    app.run(host="0.0.0.0", port=5000)  # debug=True
