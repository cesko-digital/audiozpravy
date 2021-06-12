import glob
import numpy as np
from rss_scraper.rss_scraper.scraper import scrape_feeds
from text_processing import (
    load_article_snapshots,
    add_lemmatized_texts,
    fit_tf_idf
)


if __name__ == "__main__":
    print("scraping feeds...")
    scrape_feeds()
    print("loading all snapshots into memory...")
    article_snapshots = glob.glob("s3/articles/articles-*")    
    df = load_article_snapshots(article_snapshots)
    print("processing text...")
    add_lemmatized_texts(df)
    X, words = fit_tf_idf(df["lemmatized_texts"])

    print("uploading artifacts to s3...")
    df.to_csv("s3/articles.csv")
    np.save("s3/words", words)
    np.save("s3/X", X)
    print("Done!")