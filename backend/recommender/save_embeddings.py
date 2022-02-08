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
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

from audionews.models import Article
from recommender.utils import get_embeddings
from gensim.models.doc2vec import Doc2Vec


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('Embeddings creation')


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


def calculate_bert_vectors(model_path_folder: str, vectors_path: str, create_new_vectors: bool = True):
    ''' Calculate embeddings from bert model save them into "vectors_path'''

    bert_config = read_json(configs.embedder.bert_embedder)
    bert_config['metadata']['variables']['BERT_PATH'] = model_path_folder

    logger.info('Building bert model ...')

    slavic_bert = build_model(bert_config)

    all_articles = Article.objects.all()
    if os.path.exists(vectors_path) and not create_new_vectors:
        article_embeddings = json.load(open(vectors_path, 'r'))
    else:
        article_embeddings = {}

    article_ids = [article.id for article in all_articles]
    new_articles = set(article_ids) - set(list(map(int, article_embeddings.keys())))

    logger.info('Creating embedding vectors ...')
    batch_size = 50
    tokens_l, bert_pooler_outputs_l, sent_mean_embs_l  =[],[], []
    all_articles_list = [article.title for article in all_articles if article.id in new_articles]

    for batch in tqdm(range(int(np.ceil(len(all_articles)/batch_size)))):
        tokens, token_embs, subtokens, subtoken_embs, sent_max_embs, sent_mean_embs, bert_pooler_outputs = slavic_bert(
            all_articles_list[batch * batch_size: (batch + 1) * batch_size]
        )
        tokens_l.extend(tokens)
        sent_mean_embs_l.append(sent_mean_embs)
        bert_pooler_outputs_l.extend(bert_pooler_outputs)

    sent_mean_embs_l = np.concatenate(sent_mean_embs_l, axis = 0)


    for new_article_id, emb_vecotr, token in zip(new_articles, sent_mean_embs_l, tokens_l):
        article_embeddings[str(new_article_id)] = {'tokens': token, 'sent_embedding': list(map(str, emb_vecotr))}

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
        calculate_bert_vectors(cfg.model_path, cfg.vectors_path)





