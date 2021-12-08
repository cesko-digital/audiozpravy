import argparse
import json
import logging
import os.path
import sqlite3

import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

from audionews.models import Article
from recommender.utils import get_embeddings
from gensim.models.doc2vec import Doc2Vec


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


if __name__ == '__main__':
    """ Script for calculating embeddings for all articles and saving them into specific file"""
    args = argparse.ArgumentParser()
    args.add_argument('--doc2vec-path', default='s3_input/doc2vec_articles.model')
    args.add_argument('--vectors-path', default='s3_input/articles_embeddings.json')
    cfg = args.parse_args()
    calculate_doc2vec_vectors(cfg.doc2vec_path, cfg.vectors_path)




