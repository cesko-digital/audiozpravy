from enum import Enum, auto

class CategoryEnum(Enum):
    DOMOV = 'Zprávy z domova'
    SVET = 'Zprávy ze světa',
    SPORT = "Sport"
    BYZNYS = 'Byznys zprávy'
    KULTURA = "Kultura"
    ZDRAVI = "Zdraví"
    EKONOMIKA = "Ekonomika"
    CESTOVANI = "Cestování"
    RELAX ="relax"
    VEDA = "'Věda a technologie'"
    AUTO = "Auto"
    ZIVOTNI_STYL = 'Životní styl a společnost'
    HISTORIE = "historie"
    ZAJIMAVOSTI = "Zajímavosti"
    OSTATNI = "Ostatní"


class MetricEnum(Enum):
    FRECENCY = "frecency"
    POPULARITY = "popularity"
    RECENCY = "recency"
