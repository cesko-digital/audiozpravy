import time

import feedparser
import pandas as pd
from tqdm import tqdm
from os import environ
import json


def _scrape_feed(source, local_dev):
    entries = []
    source_name = source["name"]
    print(f"Scraping {source_name} RSS feed")
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
                category = category_obj(feed['url'])
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
                    "source": source.get("name"),
                }
            )
            print(e.get("title"))
    return entries
