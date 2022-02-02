import logging
from datetime import datetime, timedelta
from babel.dates import format_timedelta, format_date
from collections import namedtuple
import pandas as pd

from classes import CategoryEnum

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

def category_mapper(keyword):
    keyword_to_category = {
        'Zprávy z domova': CategoryEnum.DOMOV,
        'Česko': CategoryEnum.DOMOV,
        'Svět': CategoryEnum.ZAHRANICI,
        'Zprávy ze světa': CategoryEnum.ZAHRANICI,
        'Sport': CategoryEnum.SPORT,
        'Kultura': CategoryEnum.KULTURA,
        'Zdraví': CategoryEnum.ZDRAVI,
        'Zajímavosti': CategoryEnum.ZAJIMAVOSTI,
        'Ekonomika': CategoryEnum.EKONOMIKA,
        'Životní styl a společnost': CategoryEnum.ZIVOTNI_STYL,
        'Věda a technologie': CategoryEnum.VEDA,
        'Byznys zprávy': CategoryEnum.BYZNYS,
        'Věda': CategoryEnum.VEDA,
        'Cestování': CategoryEnum.CESTOVANI,
        'Auto': CategoryEnum.AUTO
    }
    if keyword in keyword_to_category:
        return keyword_to_category[keyword].value
    else:
        logging.Logger.info(f'Keyword {keyword} is not in a list of known keywords. Returning category: "ostatni"')
        return CategoryEnum.OSTATNI.value

