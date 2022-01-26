import numpy as np

#X_new = np.load("s3_input/X.npy", allow_pickle=True).tolist()
#print(X_new)
from classes import CategoryEnum



for value in CategoryEnum._member_map_.values():
    print(value.value.key)
