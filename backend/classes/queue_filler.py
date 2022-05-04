import json
import logging
from typing import List
import torch
import numpy as np
import sklearn.metrics
from transformers import AutoModel, AutoTokenizer


model_name = "DeepPavlov/bert-base-bg-cs-pl-ru-cased"
class QueueFiller:
    model = AutoModel.from_pretrained(model_name, output_hidden_states=True)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    stop_words = [] #json.load(open('job_runner/data/stop_words_czech.json', 'r'))
    logger = logging.getLogger('QueueFiller')
    all_article_vectors = [] #json.load(open(embed_vectors_path, 'r')

    @staticmethod
    def recommend_articles(played_articles, articles_history) -> np.array:
        """ Recommend by user history"""
        # all_articles_filtered = self._remove_visited_articles(all_articles)

        user_history_embeddings = QueueFiller._get_bert_embeddings(played_articles)
        all_history_embeddings = QueueFiller._get_bert_embeddings(articles_history)

        # embeddings to array
        user_history_embeddings = np.array(user_history_embeddings)
        all_history_embeddings = np.array(all_history_embeddings)

        cosine_similarity = sklearn.metrics.pairwise.cosine_similarity(
            user_history_embeddings, all_history_embeddings
        )

        # sort all_articles by cosine similarity values
        articles_sum = cosine_similarity.sum(0)
        sorted_articles_ids = np.argsort(articles_sum)[::-1]
        return sorted_articles_ids

    @staticmethod
    def _get_bert_embeddings(articles) -> List[np.ndarray]:
        articles_embeddings = []
        for article in articles:

            if str(article.id) not in QueueFiller.all_article_vectors:
                QueueFiller.logger.warning(f'Embedding vector for article {article.title} and id {article.id} '
                                           f'not yet calculated. Predicting vector ...')

                words = [word for word in article.perex.split() if word not in QueueFiller.stop_words]
                words_vector = QueueFiller._get_words_mean_vector(words)
                articles_embeddings.append(words_vector)
            else:
                articles_embeddings.append(QueueFiller.all_article_vectors[str(article.id)]['sent_embedding'])

        return articles_embeddings

    @staticmethod
    def _get_hidden_states(encoded):
        layers = [-4, -3, -2, -1]
        """Push input IDs through model. Stack and sum `layers` (last four by default).
           Select only those subword token outputs that belong to our word of interest
           and average them."""
        with torch.no_grad():
            output = QueueFiller.model(**encoded)
        # Get all hidden states
        states = output.hidden_states
        # Stack and sum all requested layers
        output = torch.stack([states[i] for i in layers]).sum(0).squeeze()
        return output.mean(dim=0)

    @staticmethod
    def _get_words_mean_vector(words: List[str]):
        """Get a word vector by first tokenizing the input sentence, getting all token idxs
           that make up the word of interest, and then `get_hidden_states`."""
        encoded = QueueFiller.tokenizer.encode_plus(" ".join(words), return_tensors="pt")
        return QueueFiller._get_hidden_states(encoded)


