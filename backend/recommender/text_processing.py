import itertools as itt
from collections import namedtuple
from typing import Tuple

import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.feature_extraction.text import TfidfVectorizer
from tqdm import tqdm
from ufal.morphodita import Forms, TaggedLemmas, Tagger, TokenRanges
import time

# model download: https://lindat.mff.cuni.cz/repository/xmlui/handle/11234/1-1836#
MODEL_PATH = "czech-morfflex-pdt-161115/czech-morfflex-pdt-161115.tagger"


class Lemmatizer:
    def __init__(self) -> None:
        self.tagger = Tagger.load(MODEL_PATH)
        if self.tagger is None:
            raise ImportError(
                "Morphodita model didn't load. Check that the model is in correct directory"
            )
        self.morpho = self.tagger.getMorpho()
        self.tokenizer = self.tagger.newTokenizer()

    def get_lemmas(self, text):
        """
        get lemmas of all words in czech text, using library morphodita

        morphodita api reference:
        https://ufal.mff.cuni.cz/morphodita/api-reference

        inspiration:
        https://github.com/cesko-digital/nasi-politici/blob/master/Media-backend/app/data/helper.py
        """
        _forms = Forms()
        _lemmas = TaggedLemmas()
        _tokens = TokenRanges()
        self.tokenizer.setText(text)
        lemmas = []

        while self.tokenizer.nextSentence(_forms, _tokens):
            self.tagger.tag(_forms, _lemmas)
            for i in range(len(_lemmas)):
                lemma = _lemmas[i]
                raw_lemma = self.morpho.rawLemma(lemma.lemma)
                lemmas.append(raw_lemma)
        return lemmas


FeedparserTime = namedtuple(
    "FeedparserTime",
    [
        "tm_year",
        "tm_mon",
        "tm_mday",
        "tm_hour",
        "tm_min",
        "tm_sec",
        "tm_wday",
        "tm_yday",
        "tm_isdst",
    ],
)


def load_article_snapshots(snapshot_names: str) -> pd.DataFrame:
    dfs = []
    for snapshot in snapshot_names:
        dfs.append(pd.read_csv(snapshot, index_col=None))
    articles = pd.concat(dfs)

    # the snapshots have overlapping content, get unique articles
    articles = articles.drop_duplicates(subset=["link"], keep="last")

    # parse datetime tuple from the format the feedparser and pandas saved it in
    # TODO: fix this on csv save
    articles.published = pd.to_datetime(articles.published.map(
        lambda x: tuple(eval(x.replace("time.struct_time", "FeedparserTime")))
    ).map(time.mktime), unit="s")

    return articles


def add_lemmatized_texts(articles: pd.DataFrame) -> None:
    lemmatizer = Lemmatizer()
    lemmatized_texts = []
    for i, article in tqdm(articles.iterrows()):
        lemmatized_texts.append(
            " ".join(lemmatizer.get_lemmas(article.title + " " + article.summary))
        )
    articles["lemmatized_texts"] = lemmatized_texts


def fit_tf_idf(texts: pd.Series) -> Tuple[csr_matrix, np.ndarray]:
    vectorizer = TfidfVectorizer(min_df=2)  # max_df=0.05
    X = vectorizer.fit_transform(texts)
    words = np.array(vectorizer.get_feature_names())
    return X, words
