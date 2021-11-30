import time

import feedparser
import pandas as pd
from tqdm import tqdm
from os import environ
import json

from . import SOURCES


def _scrape_feed(source, local_dev):
    entries = []

    source_name = source["name"]
    print(f"scraping {source_name} RSS feed")
    for feed in tqdm(source["feeds"]):
        if local_dev:
            with open("pipeline/local_dev/feed_snapshot.json", "r") as f:
                parsed_feed = feedparser.util.FeedParserDict(json.load(f))
        else:
            parsed_feed = feedparser.parse(feed['url'])
        for e in parsed_feed.entries:
            category_obj = feed["category"]
            if callable(category_obj):
                # category might be simple code or function that parses the code
                # from url
                category = category_obj(e["link"])
            else:
                category = category_obj

            entries.append(
                {
                    "title": e.get("title"),
                    "link": e.get("link"),
                    "summary": e.get("summary"),
                    "published": e.get("published_parsed"),
                    "tags": [t["term"] for t in e.get("tags")] if e.get("tags") else None,
                    "category": category.name,
                    "credit": e.get("credit"),
                    "source": e.get("source_name"),
                }
            )
    return entries


def scrape_feeds():
    entries = []

    local_dev = environ.get("LOCAL_DEV", 0)

    for source in SOURCES:
        entries.extend(_scrape_feed(source, local_dev))
        if local_dev:
            # we have snapshot of just one feed
            break

    articles = pd.DataFrame(entries)

    # TODO: fix formatting for single digit integers e.g. 5 --> "05"
    df_name = "-".join([str(i) for i in tuple(time.localtime())[:5]])
    articles.to_csv(f"s3/articles/articles-{df_name}.csv", index=None)
