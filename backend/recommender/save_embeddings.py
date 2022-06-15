import argparse
import json
import logging
import os.path
import sqlite3

import numpy as np
from tqdm import tqdm

from deeppavlov.core.common.file import read_json
from deeppavlov import build_model, configs
import django
import os

from transformers import AutoModel, AutoTokenizer

from classes.BERT import BERT

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

from audionews.models import Article
from recommender.utils import get_embeddings
from gensim.models.doc2vec import Doc2Vec


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('Embeddings creation')


model_name = "DeepPavlov/bert-base-bg-cs-pl-ru-cased"
MODEL_PATH = 'data/bert-base-bg-cs-pl-ru-cased/'

def calculate_doc2vec_vectors(model_path: str, vectors_path: str) -> None:
    ''' Calculates embeddings for all available articles that are missing from "vectors_path" file and save it into
    this file'''

    doc2vec_model = Doc2Vec.load(model_path)

    all_articles = Article.objects.all()
    if os.path.exists(vectors_path):
        article_embeddings = json.load(open(vectors_path, 'r'))
    else:
        article_embeddings = {}

    article_ids = [article.id for article in all_articles]
    new_articles = set(article_ids) - set(list(map(int, article_embeddings.keys())))

    all_articles_emb = get_embeddings(
        articles=[article.perex for article in all_articles if article.id in new_articles],
        doc2vec_model=doc2vec_model
    )

    for new_article_id, emb_vecotr in zip(new_articles, all_articles_emb):
        article_embeddings[str(new_article_id)] = list(emb_vecotr)

    json.dump(article_embeddings, open(vectors_path, 'w'))


def calculate_bert_vectors(vectors_path: str, create_new_vectors: bool = True):
    ''' Calculate embeddings from bert model save them into "vectors_path'''

    all_articles = Article.objects.all()
    if os.path.exists(vectors_path) and not create_new_vectors:
        article_embeddings = json.load(open(vectors_path, 'r'))
    else:
        article_embeddings = {}

    article_ids = [article.id for article in all_articles]
    new_articles = set(article_ids) - set(list(map(int, article_embeddings.keys())))

    logger.info('Creating embedding vectors ...')
    batch_size = 50
    tokens_list, article_mean_embs_list = [], []
    all_articles_list = [article.title for article in all_articles if article.id in new_articles]

    for batch_index in tqdm(range(int(np.ceil(len(all_articles)/batch_size)))):
        token_ids, article_mean_embs = BERT.batch_vectorize_texts(
            all_articles_list[batch_index * batch_size: (batch_index + 1) * batch_size]
        )
        tokens_list.append(token_ids)
        article_mean_embs_list.append(article_mean_embs)

    article_mean_embs_list = np.concatenate(article_mean_embs_list, axis=0)

    for new_article_id, emb_vector, token_ids in zip(new_articles, article_mean_embs_list, tokens_list):
        article_embeddings[str(new_article_id)] = {'tokens': token_ids, 'sent_embedding': list(map(str, emb_vector))}

    json.dump(article_embeddings, open(vectors_path, 'w'))


if __name__ == '__main__':
    """ Script for calculating embeddings for all articles and saving them into specific file"""
    args = argparse.ArgumentParser()
    args.add_argument('--model-path', default='../bert/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt')
    args.add_argument('--vectors-path', default='job_runner/data/articles_embeddings.json')
    args.add_argument('--doc2vec', default=False, action='store_true')
    args.add_argument('--bert', default=False, action='store_true')
    cfg = args.parse_args()
    if not cfg.bert and not cfg.model:
        AssertionError('Either --bert or --doc2vec needs to be specified')
    if cfg.bert and cfg.doc2vec:
        AssertionError('Only one of the models need to be specified. Set either --bert or --doc2vec')

    if cfg.doc2vec:
        calculate_doc2vec_vectors(cfg.doc2vec_path, cfg.vectors_path)
    else:
        calculate_bert_vectors(cfg.vectors_path)





