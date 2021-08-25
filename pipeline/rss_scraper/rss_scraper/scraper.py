import time

import feedparser
from numpy_financial import ipmt
import pandas as pd
from tqdm import tqdm
from os import environ
import json

from . import SOURCES


def get_entry_value(entry, name, mapping, default=None):
    key = mapping.get(name, name)
    return entry.get(key, default)


def scrape_feeds():
    entries = []

    local_dev = environ.get("LOCAL_DEV", 0)

    for source in SOURCES:
        source_name = source["name"]
        print(f"scraping {source_name} RSS feed")
        for feed in tqdm(source["feeds"]):
            if local_dev:
                with open("local_dev/feed_snapshot.json", "r") as f:
                    parsed_feed = feedparser.util.FeedParserDict(json.load(f))
            else:
                parsed_feed = feedparser.parse(feed)
            for e in parsed_feed.entries:
                cat_func = source["mapping"]["category_func"]
                category = cat_func(parsed_feed, e)
                entries.append(
                    {
                        "title": get_entry_value(e, "title", source["mapping"]),
                        "link": get_entry_value(e, "link", source["mapping"]),
                        "summary": get_entry_value(e, "summary", source["mapping"]),
                        "published": get_entry_value(
                            e, "published_parsed", source["mapping"]
                        ),
                        "tags": [
                            t["term"]
                            for t in get_entry_value(
                                e, "tags", source["mapping"], default=[]
                            )
                        ],
                        "category": category,
                        "credit": get_entry_value(e, "credit", source["mapping"]),
                        "source": source_name,
                    }
                )
            if local_dev:
                # we have snapshot of just one feed
                break

    articles = pd.DataFrame(entries)

    # TODO: fix formatting for single digit integers e.g. 5 --> "05"
    df_name = "-".join([str(i) for i in tuple(time.localtime())[:5]])
    articles.to_csv(f"s3/articles/articles-{df_name}.csv", index=None)
