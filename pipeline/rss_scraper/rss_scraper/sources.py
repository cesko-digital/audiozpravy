from enum import Enum, auto


class Category(Enum):
    DOMOV = auto()
    ZAHRANICI = auto()
    SPORT = auto()
    BYZNYS = auto()
    KULTURA = auto()
    ZDRAVI = auto()
    CESTOVANI = auto()
    RELAX = auto()
    VEDA = auto()  # rozdelit na veda a technologie?
    AUTO = auto()
    ZIVOTNI_STYL = auto()
    HISTORIE = auto()


def parse_ctidoma_category(url):
    cat_code = url.replace("https://www.ctidoma.cz/", "").split("/")[0]
    mapping = {
        "zpravodajstvi-historie": Category.HISTORIE,
        "osobnosti": Category.RELAX,
        "zivotni-styl": Category.ZIVOTNI_STYL,
        "v-obraze": Category.RELAX,
        "politika": Category.DOMOV,  # tohle asi neni presne?
        "zpravodajstvi": Category.DOMOV,  # tohle asi neni presne?
        "historie": Category.HISTORIE,
        "zajimavosti": Category.RELAX,
    }
    return mapping[cat_code]


SOURCES = [
    {
        "name": "lidovky.cz",
        "feeds": [
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_domov",
                "category": Category.DOMOV,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_zahranici",
                "category": Category.ZAHRANICI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_sport",
                "category": Category.SPORT,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_byznys",
                "category": Category.BYZNYS,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_kultura",
                "category": Category.KULTURA,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln-zdravi",
                "category": Category.ZDRAVI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_cestovani",
                "category": Category.CESTOVANI,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?c=ln_relax",
                "category": Category.RELAX,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln_veda",
                "category": Category.VEDA,
            },
            {
                "url": "https://servis.lidovky.cz/rss.aspx?r=ln-auto",
                "category": Category.AUTO,
            },
        ],
    },
    {
        "name": "irozhlas.cz",
        "feeds": [
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov",
                "category": Category.DOMOV,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zpravy-svet",
                "category": Category.ZAHRANICI,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/sport",
                "category": Category.SPORT,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/ekonomika",
                "category": Category.BYZNYS,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/kultura",
                "category": Category.KULTURA,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/zivotni-styl",
                "category": Category.ZIVOTNI_STYL,
            },
            {
                "url": "https://www.irozhlas.cz/rss/irozhlas/section/veda-technologie",
                "category": Category.VEDA,
            },
        ],
    },
    {
        "name": "denikn.cz",
        "feeds": [
            {"url": "https://denikn.cz/cesko/feed/", "category": Category.DOMOV},
            {"url": "https://denikn.cz/svet/feed", "category": Category.ZAHRANICI},
            {"url": "https://denikn.cz/sport/feed", "category": Category.SPORT},
            {"url": "https://denikn.cz/ekonomika/feed", "category": Category.BYZNYS},
            {"url": "https://denikn.cz/kultura/feed", "category": Category.KULTURA},
            {"url": "https://denikn.cz/veda/feed", "category": Category.VEDA},
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
