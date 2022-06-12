model_name = "DeepPavlov/bert-base-bg-cs-pl-ru-cased"
MODEL_PATH = 'data/bert-base-bg-cs-pl-ru-cased/'
import logging
from typing import List
import torch
from transformers import AutoModel, AutoTokenizer


class BERT:
    model = AutoModel.from_pretrained(MODEL_PATH, local_files_only=True, output_hidden_states=True)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, local_files_only=True)
    stop_words = [] #json.load(open('job_runner/data/stop_words_czech.json', 'r'))
    logger = logging.getLogger('BERT')

    @staticmethod
    def _get_hidden_states(inputs):
        layers = [-4, -3, -2, -1]
        """Push input IDs through model. Stack and sum `layers` (last four by default).
           Select only those subword token outputs that belong to our word of interest
           and average them."""
        with torch.no_grad():
            output = BERT.model(**inputs)
        # Get all hidden states
        states = output.hidden_states
        # Stack and sum all requested layers
        output = torch.stack([states[i] for i in layers]).sum(0).squeeze()
        return output.mean(dim=0)

    @staticmethod
    def vectorize_words(words: List[str]):
        """Get a word vector by first tokenizing the input sentence, getting all token idxs
           that make up the word of interest, and then `get_hidden_states`."""
        inputs = BERT.tokenizer.encode_plus(" ".join(words), return_tensors="pt")
        return BERT._get_hidden_states(inputs)

    @staticmethod
    def batch_vectorize_texts(texts: List[str]):
        inputs = BERT.tokenizer.batch_encode_plus(texts, padding=True, truncation=True, return_tensors="pt")
        input_ids, token_type_ids, attention_mask = inputs
        return input_ids, BERT._get_hidden_states(inputs)
