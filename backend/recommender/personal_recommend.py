import json
import logging
import sqlite3

import numpy as np
import pandas as pd
import sklearn
import sklearn.metrics.pairwise
from recommender.utils import get_all_articles, get_embeddings

from gensim.models.doc2vec import Doc2Vec, TaggedDocument


class PersonalRecommender:
    def __init__(
            self, user_device_id: int, model_path ='s3_input/doc2vec_articles.model', user_last_days: int = 100000,
            embed_vector_path = None
    ):
        self.user_device_id = user_device_id
        self.con = sqlite3.connect("db.sqlite3")
        self.user_history = self._get_user_articles(user_last_days, self.con)
        self.doc2vec = Doc2Vec.load(model_path)
        self.embed_vectors_path = embed_vector_path
        self.logger = logging.getLogger('Personal Evaluations')


    def _get_embeddings(self, articles: pd.DataFrame, id_column: str = 'id'):
        ''' get embeddings for given dataframe. If the embeddings are not already calculated -> create them'''
        if not self.embed_vectors_path:
            self.logger.info('Predicting embeddings')
            articles_embeddings = get_embeddings(
                articles.perex.apply(lambda x: x.split()).tolist(), self.doc2vec
            )
        else:
            self.logger.info(f'Getting embeddings from file {self.embed_vectors_path}')

            articles_embeddings = []
            all_embed_json = json.load(open(self.embed_vectors_path, 'r'))
            for _, article in articles.iterrows():
                if str(article[id_column]) not in all_embed_json:
                    logging.warning(f'Embedding vector for article {article.title} and id {article.id} '
                                    f'not yet calculated. Predicting vector ...')
                    articles_embeddings.append(self.doc2vec.infer_vector(article.perex.split()))
                    continue
                articles_embeddings.append(all_embed_json[str(article[id_column])])
        return articles_embeddings


    def recommend(self, n_of_past_days: int):
        """ Recommend by user history"""
        all_articles = get_all_articles(last_n_of_days=n_of_past_days, con=self.con)
        all_articles_filtered = self._remove_visited_articles(all_articles)

        user_history_embeddings = self._get_embeddings(self.user_history, id_column='article_id')
        all_history_embeddings = self._get_embeddings(all_articles_filtered, id_column='id')

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
                INNER JOIN a_listener ON a_listener.user_ptr_id = a_play.listener_id
                WHERE a_listener.device_id = {self.user_device_id} AND a_play.played_at > datetime('now', '-{last_n_days} days')
                """,
            con)
        return user_articles
        # texts_lists = user_articles.text.apply(lambda x: x.split()).tolist()
        # return texts_lists

    def save_playlist(self):
        pass


recommender = PersonalRecommender(user_device_id=2, embed_vector_path='s3_input/articles_embeddings.json')
articles_sorted = recommender.recommend(n_of_past_days=90000)
