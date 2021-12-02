from enum import Enum, auto

class Category:
    def __init__(self, name, key):
        self.name = name
        self.key = key

class CategoryEnum(Enum):
    DOMOV = Category("Z domova", "domov")
    ZAHRANICI = Category("Svět", "svet")
    SPORT = Category("Sport", "sport")
    BYZNYS = Category("Byznys", "byznys")
    KULTURA = Category("Kultura", "kultura")
    ZDRAVI = Category("Zdraví", "zdravi")
    CESTOVANI = Category("Cestovaní", "cestovani")
    RELAX = Category("Relax", "relax")
    VEDA = Category("Věda", "veda")
    AUTO = Category("Auto", "auto")
    ZIVOTNI_STYL = Category("Životní styl", "styl")
    HISTORIE = Category("Historie", "historie")
    UNKNOWN = Category("", "unknown")


class MetricEnum(Enum):
    FRECENCY = "frecency"
    POPULARITY = "popularity"
    RECENCY = "recency"
