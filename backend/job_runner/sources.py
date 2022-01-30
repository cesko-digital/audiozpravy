from classes import CategoryEnum
from classes.categorizer import parse_ctidoma_category

SOURCES = [
    {
        "name": "lidovky.cz",
        "feeds": [
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_domov",
                "category": CategoryEnum.DOMOV,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_zahranici",
                "category": CategoryEnum.ZAHRANICI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_sport",
                "category": CategoryEnum.SPORT,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_byznys",
                "category": CategoryEnum.BYZNYS,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_kultura",
                "category": CategoryEnum.KULTURA,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln-zdravi",
                "category": CategoryEnum.ZDRAVI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_cestovani",
                "category": CategoryEnum.CESTOVANI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_relax",
                "category": CategoryEnum.RELAX,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_veda",
                "category": CategoryEnum.VEDA,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln-auto",
                "category": CategoryEnum.AUTO,
            },
        ],
    },
    {
        "name": "irozhlas.cz",
        "feeds": [
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov",
                "category": CategoryEnum.DOMOV,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-svet",
                "category": CategoryEnum.ZAHRANICI,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/sport",
                "category": CategoryEnum.SPORT,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/ekonomika",
                "category": CategoryEnum.BYZNYS,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/kultura",
                "category": CategoryEnum.KULTURA,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zivotni-styl",
                "category": CategoryEnum.ZIVOTNI_STYL,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/veda-technologie",
                "category": CategoryEnum.VEDA,
            },
        ],
    },
    {
        "name": "denikn.cz",
        "feeds": [
            {"url": "https://denikn.cz/cesko/feed/", "category": CategoryEnum.DOMOV},
            {"url": "https://denikn.cz/svet/feed", "category": CategoryEnum.ZAHRANICI},
            {"url": "https://denikn.cz/sport/feed", "category": CategoryEnum.SPORT},
            {"url": "https://denikn.cz/ekonomika/feed", "category": CategoryEnum.BYZNYS},
            {"url": "https://denikn.cz/kultura/feed", "category": CategoryEnum.KULTURA},
            {"url": "https://denikn.cz/veda/feed", "category": CategoryEnum.VEDA},
        ],
    },
    {
        "name": "ctidoma.cz",
        "feeds": [
            {
                "url": "https://www.ctidoma.cz/export/cesko-digital",
                "category": parse_ctidoma_category,
            }
        ],
    },
]

