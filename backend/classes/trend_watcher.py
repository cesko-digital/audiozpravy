from cachetools import cached, TTLCache
import feedparser
from typing import Dict, List
import numpy as np

class TrendWatcher:

    @classmethod
    @cached(cache=TTLCache(maxsize=2, ttl=1800))
    def get_daily_google_trends(cls) -> List[Dict]:
        trend_feed = "https://trends.google.cz/trends/trendingsearches/daily/rss?geo=CZ"
        trends = feedparser.parse(trend_feed)

        top_trends = []
        for item in trends["entries"]:
            top_trends.append(
                {
                    "value": item["title"],
                    "traffic": item["ht_approx_traffic"],
                    "summary": item["summary"],
                    "published": item["published_parsed"],
                }
            )
        return top_trends


