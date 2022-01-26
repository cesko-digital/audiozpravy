import argparse
import json
import logging
import sqlite3

import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
django.setup()

from gensim.models.doc2vec import Doc2Vec, TaggedDocument

from audionews.models import Article

logging.basicConfig(level=logging.INFO)


def train_w2v_model(save_model_path):
    articles = Article.objects.all()
    stopwords = json.load(open('s3_input/stop_words_czech.json', 'r'))
    documents = []
    for article in articles:
        words = article.perex.lower().split()
        words_no_stopwords = [word for word in words if word not in stopwords]

        documents.append(TaggedDocument(words_no_stopwords, [article.id]))

    logging.info('Training model')
    model = Doc2Vec(vector_size=100, epochs=120, alpha=0.025, min_count=2)
    model.build_vocab(documents, progress_per=1000)
    model.train(documents, total_examples=model.corpus_count, epochs=model.epochs)

    vector = documents[0].words
    result = model.dv.most_similar(model.infer_vector(vector))

    model.save(save_model_path)


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument('--save-path', default='s3_input/doc2vec_articles.model', help="Path to save final model")
    cfg = args.parse_args()
    """ Train model based on all articles in a database and save it to disk"""

    train_w2v_model(cfg.save_path)
