from typing import List

import numpy as np
import pandas as pd


def get_all_articles(last_n_of_days: int, con) -> pd.DataFrame:
    """ Gets all articles from past "last_n_of_days" days """
    articles_last_n_days = pd.read_sql_query(
        f"SELECT * from a_article where a_article.pub_date > datetime('now', '-{last_n_of_days} days')",
        con
    )

    return articles_last_n_days


def get_embeddings(articles: List[str], doc2vec_model) -> np.ndarray:
    """ Get embeddings for specific articles"""
    vectors = np.zeros((len(articles), doc2vec_model.vector_size))
    for i, article in enumerate(articles):
        vectors[i] = doc2vec_model.infer_vector(article)

    return vectors
