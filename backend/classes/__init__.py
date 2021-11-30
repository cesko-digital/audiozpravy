from enum import Enum, auto

class CategoryEnum(Enum):
    DOMOV = "domov"
    ZAHRANICI = "zahranici"
    SPORT = "sport"
    BYZNYS = "byznys"
    KULTURA = "kultura"
    ZDRAVI = "zdravi"
    CESTOVANI = "cestovani"
    RELAX ="relax"
    VEDA = "veda"
    AUTO = "auto"
    ZIVOTNI_STYL = "zivotni_styl"
    HISTORIE = "historie"


class MetricEnum(Enum):
    FRECENCY = "frecency"
    POPULARITY = "popularity"
    RECENCY = "recency"
