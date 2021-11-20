import argparse
import json
import os.path
import sqlite3

from recommender.utils import get_embeddings, get_all_articles
from gensim.models.doc2vec import Doc2Vec

def calculate_doc2vec_vectors(model_path: str, vectors_path: str) -> None:
    ''' Calculates embeddings for all available articles that are missing from "vectors_path" file and save it into
    this file'''

    doc2vec_model = Doc2Vec.load(model_path)
    all_articles = get_all_articles(
        last_n_of_days=10000,
        con=sqlite3.connect('db.sqlite3')
    )

    if os.path.exists(vectors_path):
        article_embeddings = json.load(open(vectors_path, 'r'))
    else:
        article_embeddings = {}

    new_articles = set(all_articles['id']) - set(list(map(int, article_embeddings.keys())))
    all_articles_subset = all_articles.loc[all_articles.id.isin(new_articles)]
    all_articles_emb = get_embeddings(
        all_articles_subset.perex.apply(lambda x: x.split()).tolist(), doc2vec_model
    )

    for article_id, emb_vecotr in zip(all_articles['id'].values, all_articles_emb):
        article_embeddings[str(article_id)] = list(emb_vecotr)

    json.dump(article_embeddings, open(vectors_path, 'w'))


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument('--doc2vec-path', default='s3_input/doc2vec_articles.model')
    args.add_argument('--vectors-path', default='s3_input/articles_embeddings.json')
    cfg = args.parse_args()
    calculate_doc2vec_vectors(cfg.doc2vec_path, cfg.vectors_path)


