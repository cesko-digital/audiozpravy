from flask import Flask, render_template
import pandas as pd
import numpy as np
from typing import List, Dict

from flask_restful import Resource, Api


import time
import threading


ARTICLES_REFRESH = 900  # 15 min

app = Flask(__name__)
api = Api(app)



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
            import os

            print()
            print(f"####: {os.getcwd()}")

            articles_new = pd.read_csv("s3_input/articles.csv", parse_dates=["published"])
            X_new = np.load("s3_input/X.npy", allow_pickle=True).tolist()
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




