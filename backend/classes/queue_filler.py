from typing import List

import numpy as np
import sklearn.metrics
import json

from audionews.models import Article
from classes.BERT import BERT


class QueueFiller:
    EMBED_VECTORS_PATH = 'job_runner/data/articles_embeddings.json'
    model = BERT
    all_article_vectors = json.load(open(EMBED_VECTORS_PATH, 'r'))

    @staticmethod
    def recommend_articles(played_articles, articles_history) -> np.array:
        """ Recommend by user history"""
        # all_articles_filtered = self._remove_visited_articles(all_articles)

        user_history_embeddings = QueueFiller._get_bert_embeddings(played_articles)
        all_history_embeddings = QueueFiller._get_bert_embeddings(articles_history)

        # embeddings to array
        user_history_embeddings = np.array(user_history_embeddings)
        all_history_embeddings = np.array(all_history_embeddings)

        cosine_similarity = sklearn.metrics.pairwise.cosine_similarity(
            user_history_embeddings, all_history_embeddings
        )

        # sort all_articles by cosine similarity values
        articles_sum = cosine_similarity.sum(0)
        sorted_articles_ids = np.argsort(articles_sum)[::-1]
        return sorted_articles_ids

    @staticmethod
    def _get_bert_embeddings(articles: List[Article]) -> List[np.ndarray]:
        articles_embeddings = []
        for article in articles:

            if str(article.id) not in QueueFiller.all_article_vectors:
                BERT.logger.warning(f'Embedding vector for article {article.title} and id {article.id} '
                                    f'not yet calculated. Predicting vector ...')

                words = [word for word in article.perex.split() if word not in BERT.stop_words]
                words_vector = BERT.vectorize_words(words)
                articles_embeddings.append(words_vector)
            else:
                articles_embeddings.append(QueueFiller.all_article_vectors[str(article.id)]['sent_embedding'])

        return articles_embeddings



