from pipeline.rss_scraper.rss_scraper.scraper import _scrape_feed
from pipeline.rss_scraper.rss_scraper.sources import SOURCES


def test_scrape_feeds():
    entries = _scrape_feed(SOURCES[0], 1)
    assert len(entries) > 1
    expected_attrs = {
        "tags",
        "published",
        "category",
        "summary",
        "credit",
        "source",
        "link",
        "title",
    }
    entry = entries[0]
    assert set(entry.keys()) == expected_attrs

    # check that we lost the enum type for the export
    assert isinstance(entry["category"], str)

