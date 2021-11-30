from gensim.models import KeyedVectors

# api reference: https://radimrehurek.com/gensim/models/keyedvectors.html
wv_from_bin = KeyedVectors.load_word2vec_format("cz-w2v/model.bin", binary=True)

word_set = set(wv_from_bin.key_to_index)
