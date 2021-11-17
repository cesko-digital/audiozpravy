from typing import List

import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity


def find_duplicates(X: csr_matrix, article_id: int) -> List:
    # TODO: implement for all articles at once (and remove them)
    test = cosine_similarity(X)[article_id, :]
    return np.where(test > 0.2)[0].tolist()
