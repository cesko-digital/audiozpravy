import argparse
import sqlite3

import pandas as pd
from gensim.models.doc2vec import Doc2Vec, TaggedDocument



if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument('--n-of-days', default=1000000, help = "Number of days to consider training doc2vec model")
    args.add_argument('--save-path', default='s3_input/doc2vec_articles.model', help="Path to save final model")
    cfg = args.parse_args()

    """ Train model based on all articles in a database and save it to disk"""

    con = sqlite3.connect("db.sqlite3")
    df = pd.read_sql_query("SELECT * from a_article", con)
    df_no_duplicates = df[['text']].drop_duplicates()

    documents = [TaggedDocument(doc, [i]) for i, doc in enumerate(df_no_duplicates.text)]

    model = Doc2Vec(vector_size=100, min_count=2, epochs=40)
    model.build_vocab(documents, progress_per=100)
    model.train(documents, total_examples=model.corpus_count, epochs=model.epochs)

    model.save('s3_input/doc2vec_articles.model')