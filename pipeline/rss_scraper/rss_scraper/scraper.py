import time

import feedparser
import pandas as pd
from tqdm import tqdm

from . import SOURCES


def get_entry_value(entry, name, mapping, default=None):
    key = mapping.get(name, name)
    return entry.get(key, default)


def scrape_feeds():
    entries = []

    for source in SOURCES:
        source_name = source["name"]
        print(f"scraping {source_name} RSS feed")
        for feed in tqdm(source["feeds"]):
            persed_feed = feedparser.parse(feed)
            for e in persed_feed.entries:
                cat_func = source["mapping"]["category_func"]
                category = cat_func(persed_feed, e)
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

    articles = pd.DataFrame(entries)

    # TODO: fix formatting for single digit integers e.g. 5 --> "05"
    df_name = "-".join([str(i) for i in tuple(time.localtime())[:5]])
    articles.to_csv("articles-" + df_name, index=None)
