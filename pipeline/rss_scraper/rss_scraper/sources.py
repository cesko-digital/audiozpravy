SOURCES = [
    {
        "name": "lidovky.cz",
        "feeds": [
            "https://servis.lidovky.cz/rss.aspx?r=ln_domov",
            "https://servis.lidovky.cz/rss.aspx?r=ln_zahranici",
            "https://servis.lidovky.cz/rss.aspx?c=ln_sport",
            "https://servis.lidovky.cz/rss.aspx?c=ln_byznys",
            "https://servis.lidovky.cz/rss.aspx?r=ln_kultura",
            "https://servis.lidovky.cz/rss.aspx?r=ln-zdravi",
            "https://servis.lidovky.cz/rss.aspx?c=ln_cestovani",
            "https://servis.lidovky.cz/rss.aspx?c=ln_relax",
            "https://servis.lidovky.cz/rss.aspx?r=ln_veda",
            "https://servis.lidovky.cz/rss.aspx?r=ln-auto",
        ],
        "mapping": {
            "category_func": lambda feed, e: feed.feed["title"].split("|")[0].strip()
        },
    },
    {
        "name": "irozhlas.cz",
        "feeds": [
            "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov",
            "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-svet",
            "https://www.irozhlas.cz/rss/irozhlas/section/sport",
            "https://www.irozhlas.cz/rss/irozhlas/section/ekonomika",
            "https://www.irozhlas.cz/rss/irozhlas/section/kultura",
            "https://www.irozhlas.cz/rss/irozhlas/section/zivotni-styl",
            "https://www.irozhlas.cz/rss/irozhlas/section/veda-technologie",
        ],
        "mapping": {
            "category_func": lambda feed, e: feed.feed["title"].split("-")[0].strip()
        },
    },
    {
        "name": "denikn.cz",
        "feeds": [
            "https://denikn.cz/cesko/feed/",
            "https://denikn.cz/svet/feed",
            "https://denikn.cz/sport/feed",
            "https://denikn.cz/ekonomika/feed",
            "https://denikn.cz/kultura/feed",
            "https://denikn.cz/veda/feed",
        ],
        "mapping": {
            "category_func": lambda feed, e: feed.feed["title"].split("–")[0].strip()
        },
    },
]
