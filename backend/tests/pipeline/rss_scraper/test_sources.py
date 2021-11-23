from pipeline.rss_scraper.rss_scraper.sources import (
    parse_ctidoma_category,
    Category,
)


def test_parse_ctidoma_category():
    url = "https://www.ctidoma.cz/zpravodajstvi-historie/jeptiska-ktera-poradala-bujare-vecirky-hrala-karty-plavila-se-na-jachtach"
    assert parse_ctidoma_category(url) == Category.HISTORIE
