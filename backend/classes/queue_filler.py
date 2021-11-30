import json
import logging
from typing import List

import numpy as np
import pandas as pd
import sklearn.metrics
from gensim.models import Doc2Vec

class QueueFiller:
    embed_vectors_path = 'backend/s3_input/articles_embeddings.json'
    doc2vec_path = 'backend/s3_input/doc2vec_articles.model'
    all_article_vectors = json.load(open(embed_vectors_path, 'r'))
    doc2vec_model = Doc2Vec.load(doc2vec_path)
    logger = logging.getLogger('QueueFiller')

    @staticmethod
    def recommend_articles(played_articles, articles_history) -> np.array:
        """ Recommend by user history"""
        # all_articles_filtered = self._remove_visited_articles(all_articles)

        user_history_embeddings = QueueFiller._get_embeddings(played_articles)
        all_history_embeddings = QueueFiller._get_embeddings(articles_history)

        # embeddings to array
        user_history_embeddings = np.array(user_history_embeddings)
        all_history_embeddings = np.array(all_history_embeddings)

        cosine_similarity = sklearn.metrics.pairwise.cosine_similarity(
            user_history_embeddings, all_history_embeddings
        )

        # sort all_articles by cosine similarity values
        articles_sum = cosine_similarity.sum(0)

        sorted_articles_ids = np.argsort(articles_sum)
        return sorted_articles_ids


    @staticmethod
    def _get_embeddings(articles):
        ''' get embeddings for given dataframe. If the embeddings are not already calculated -> create them'''

        articles_embeddings = []
        for article in articles:

            if str(article.id) not in QueueFiller.all_article_vectors:
                QueueFiller.logger.warning(f'Embedding vector for article {article.title} and id {article.id} '
                                f'not yet calculated. Predicting vector ...')
                articles_embeddings.append(QueueFiller.doc2vec_model.infer_vector(article.perex.split()))
            else:
                articles_embeddings.append(QueueFiller.all_article_vectors[str(article.id)])

        return articles_embeddings