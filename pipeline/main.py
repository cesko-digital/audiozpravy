import glob
import numpy as np
from rss_scraper.rss_scraper.scraper import scrape_feeds
from text_processing import load_article_snapshots, add_lemmatized_texts, fit_tf_idf
import boto3
from botocore.exceptions import ClientError
import os
from tts import process_audio, upload_to_s3
from config import CONFIG
from os import environ

if __name__ == "__main__":
    print("scraping feeds...")
    scrape_feeds()
    print("loading all snapshots into memory...")
    article_snapshots = glob.glob("s3/articles/articles-*")
    df = load_article_snapshots(article_snapshots)
    print("processing text...")
    add_lemmatized_texts(df)
    X, words = fit_tf_idf(df["lemmatized_texts"])

    print("text-to-speach processing...")
    for (index, row) in df.iterrows():
        filename = process_audio(title=row["title"], content=row["summary"])

        df.loc[index, "audio"] = filename

    print("saving artifacts...")
    df.to_csv("s3/articles.csv")
    np.save("s3/words", words)
    np.save("s3/X", X)

    local_dev = environ.get("LOCAL_DEV", 0)
    if local_dev:
        print("artifacts were saved to local storage")

    else:
        print("uploading artifacts to s3...")
        upload_to_s3()

    print("Done!")
