from enum import Enum, auto

class CategoryEnum(Enum):
    DOMOV = "Z domova"
    ZAHRANICI = "Svět"
    SPORT = "Sport"
    BYZNYS = "Byznys"
    KULTURA = "Kultura"
    ZDRAVI = "Zdraví"
    CESTOVANI = "Cestovaní"
    RELAX ="Relax"
    VEDA = "Věda"
    AUTO = "Auto"
    ZIVOTNI_STYL = "Životní styl"
    HISTORIE = "Historie"
    UNKNOWN = ""


class MetricEnum(Enum):
    FRECENCY = "frecency"
    POPULARITY = "popularity"
    RECENCY = "recency"
