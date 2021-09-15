from pipeline.rss_scraper.rss_scraper.scraper import _scrape_feed
from pipeline.rss_scraper.rss_scraper.sources import SOURCES


def test_scrape_feeds():
    feeds = _scrape_feed(SOURCES[0], 1)
    print(feeds)
    import ipdb

    ipdb.set_trace()
