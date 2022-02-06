import json
import logging
from typing import List

import numpy as np
import pandas as pd
import sklearn.metrics
from gensim.models import Doc2Vec
from deeppavlov.core.common.file import read_json
from deeppavlov import build_model, configs


def get_bert_model(bert_model_path: str):
    bert_config = read_json(configs.embedder.bert_embedder)
    bert_config['metadata']['variables']['BERT_PATH'] = bert_model_path

    logging.info('Building bert model ...')

    slavic_bert = build_model(bert_config)
    return slavic_bert

class QueueFiller:
    embed_vectors_path = 'job_runner/data/articles_embeddings.json'
    bert_model_path = 'job_runner/data/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt'
    stop_words = json.load(open('job_runner/data/stop_words_czech.json', 'r'))
    logger = logging.getLogger('QueueFiller')
    all_article_vectors = json.load(open(embed_vectors_path, 'r'))
    bert_model = get_bert_model(bert_model_path)

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
    def _get_bert_embeddings(articles) -> List[np.ndarray]:
        articles_embeddings = []
        for article in articles:

            if str(article.id) not in QueueFiller.all_article_vectors:
                QueueFiller.logger.warning(f'Embedding vector for article {article.title} and id {article.id} '
                                           f'not yet calculated. Predicting vector ...')

                word_vector = [word for word in article.perex.split() if word not in QueueFiller.stop_words]

                _, _, _, _, _, sent_mean_embs, _ = QueueFiller.bert_model([word_vector])
                articles_embeddings.append(sent_mean_embs[0])
            else:
                articles_embeddings.append(QueueFiller.all_article_vectors[str(article.id)]['sent_embedding'])


        return articles_embeddings
