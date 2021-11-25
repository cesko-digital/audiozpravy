from datetime import datetime, timedelta
from babel.dates import format_timedelta, format_date
from collections import namedtuple
import pandas as pd

FeedparserTime = namedtuple(
    "FeedparserTime",
    [
        "tm_year",
        "tm_mon",
        "tm_mday",
        "tm_hour",
        "tm_min",
        "tm_sec",
        "tm_wday",
        "tm_yday",
        "tm_isdst",
    ],
)


def pretty_format_date(date: datetime) -> str:
    delta = datetime.now() - date

    if delta < timedelta(days=7):
        return format_timedelta(delta, locale="cs_CZ")
    elif date > datetime(year=datetime.now().year, month=1, day=1):
        return format_date(date, "d. MMMM", locale="cs_CZ")
    else:
        return format_date(date, "d. MMMM y", locale="cs_CZ")


def format_articles(selected_articles: pd.DataFrame) -> pd.DataFrame:
    # TODO: resolve feedparser time format elsewhere
    selected_articles["published"] = selected_articles["published"].map(
        pretty_format_date
    )

    return selected_articles
