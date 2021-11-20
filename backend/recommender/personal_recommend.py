import sqlite3

import numpy as np
import pandas as pd
import sklearn
import sklearn.metrics.pairwise
from recommender.utils import get_all_articles, get_embeddings

from gensim.models.doc2vec import Doc2Vec, TaggedDocument



class PersonalRecommender:
    def __init__(self, user_id: int, model_path = 's3_input/doc2vec_articles.model', user_last_days: int = 100000):
        self.user_id = user_id
        self.con = sqlite3.connect("db.sqlite3")
        self.user_history = self._get_user_articles(user_last_days, self.con)
        self.doc2vec = Doc2Vec.load(model_path)


    def recommend(self, n_of_past_days: int):
        """ Recommend by user history"""
        all_articles = get_all_articles(last_n_of_days=n_of_past_days, con=self.con)
        all_articles_filtered = self._remove_visited_articles(all_articles)

        user_history_embeddings = get_embeddings(
            self.user_history.perex.apply(lambda x: x.split()).tolist(), self.doc2vec
        )
        all_history_embeddings = get_embeddings(
            all_articles_filtered.perex.apply(lambda x: x.split()).tolist(), self.doc2vec
        )

        cosine_similarity = sklearn.metrics.pairwise.cosine_similarity(
            user_history_embeddings, all_history_embeddings
        )

        # sort all_articles by cosine similarity values
        articles_sum = cosine_similarity.sum(0)

        # join cosine similarity sum to dataframe and sort by this column
        all_articles_filtered['recommendation_value'] = articles_sum
        all_articles_filtered.sort_values('recommendation_value', ascending=False, inplace=True)
        return all_articles_filtered


    def _remove_visited_articles(self, articles):
        """ Removed visited articles by user-history"""
        # TODO: remove articles seen by user
        return articles


    def _get_user_articles(self, last_n_days: int, con):
        ''' Get articles listenes by user from "last_n_days" days'''
        user_articles = pd.read_sql_query(
            f"""
                SELECT * FROM a_article
                INNER JOIN a_play ON a_article.id= a_play.article_id
                WHERE a_play.listener_id = {self.user_id} AND a_play.played_at > datetime('now', '-{last_n_days} days')
                """,
            con)
        return user_articles
        # texts_lists = user_articles.text.apply(lambda x: x.split()).tolist()
        # return texts_lists

    def save_playlist(self):
        pass


recommender = PersonalRecommender(user_id=2)
articles_sorted = recommender.recommend(n_of_past_days=90000)
