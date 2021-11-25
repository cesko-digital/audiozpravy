import numpy as np
from math import e, log
from datetime import datetime

def calculate_age_in_secs(self, articles):
    now_timestamp = datetime.timestamp(datetime.now(self.timezone))
    return now_timestamp - articles.published.values.astype(np.int64) / 1e9


def calculate_frecency(popularity: float, age: float):
    """
    see https://wiki.mozilla.org/User:Jesse/NewFrecency
    """
    # how much will be older articles penalized,
    # interpretation: the denominator is number of seconds after which the score halves
    lambda_const = log(2) / (7 * 24 * 60 * 60)  # 7 days
    return np.multiply(70 + np.log(popularity), np.exp(-lambda_const * age))


# TODO: get more fine-grained similarity with w2v
#     trend_w2v_words = set(trend_words).intersection(word_set)
#     article_w2v_words = set(get_relevant_words(tf_idf_matrix, words, 0)[0]).intersection(word_set)
#     print(trend_w2v_words)
#     print(article_w2v_words)
#     res = wv_from_bin.n_similarity(trend_w2v_words, article_w2v_words)
#     print(res)
#     break
