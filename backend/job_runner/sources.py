from classes import CategoryEnum

from classes.categorizer import parse_category

SOURCES = [
    {
        "name": "lidovky.cz",
        "feeds": [
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_domov","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_zahranici","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?c=ln_sport", "category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?c=ln_byznys", "category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_kultura","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_zdravi","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?c=ln_cestovani","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?c=ln_relax","category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_veda", "category": parse_category},
            {"url": "https://servis.lidovky.cz/rss.aspx?r=ln_auto", "category": parse_category},
        ],
    },
    {
        "name": "irozhlas.cz",
        "feeds": [
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov","category": parse_category},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-svet","category": parse_category},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/sport","category": parse_category},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/ekonomika","category": parse_category,},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/kultura","category": parse_category},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/zivotni-styl","category": parse_category,},
            {"url": "https://www.irozhlas.cz/rss/irozhlas/section/veda-technologie", "category": parse_category,
            },
        ],
    },
    {
        "name": "denikn.cz",
        "feeds": [
            {"url": "https://denikn.cz/cesko/feed/", "category": parse_category},
            {"url": "https://denikn.cz/svet/feed", "category": parse_category},
            {"url": "https://denikn.cz/sport/feed", "category": parse_category},
            {"url": "https://denikn.cz/ekonomika/feed", "category": parse_category},
            {"url": "https://denikn.cz/kultura/feed", "category": parse_category},
            {"url": "https://denikn.cz/veda/feed", "category": parse_category},
        ],
    },
    {
        "name": "ctidoma.cz",
        "feeds": [
            {"url": "https://www.ctidoma.cz/export/cesko-digital","category": parse_category,}
        ],
    },
]

