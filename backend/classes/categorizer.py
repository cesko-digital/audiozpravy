from classes import CategoryEnum

def parse_ctidoma_category(url):
    cat_code = url.replace("https://www.ctidoma.cz/", "").split("/")[0]
    mapping = {
        "zpravodajstvi-historie": CategoryEnum.HISTORIE,
        "osobnosti": CategoryEnum.RELAX,
        "zivotni-styl": CategoryEnum.ZIVOTNI_STYL,
        "v-obraze": CategoryEnum.RELAX,
        "politika": CategoryEnum.DOMOV,  # tohle asi neni presne?
        "zpravodajstvi": CategoryEnum.DOMOV,  # tohle asi neni presne?
        "historie": CategoryEnum.HISTORIE,
        "zajimavosti": CategoryEnum.RELAX,
    }
    return mapping[cat_code]


def parse_lidovky_category(url):
    cat_code = url.replace("https://www.lidovky.cz/", "").split("/")[0]
    mapping = {
        "domov": CategoryEnum.DOMOV,
        "volby": CategoryEnum.DOMOV,
        "zahranici": CategoryEnum.ZAHRANICI,
        "svet": CategoryEnum.ZAHRANICI,
        "orientace": CategoryEnum.ZAHRANICI,
        "sport": CategoryEnum.SPORT,
        "byznys":  CategoryEnum.BYZNYS,
        "kultura": CategoryEnum.KULTURA,
        "zdravi": CategoryEnum.ZDRAVI,
        "cestovani": CategoryEnum.CESTOVANI,
        "relax": CategoryEnum.RELAX,
        "veda": CategoryEnum.VEDA,
        "auto": CategoryEnum.AUTO,
    }
    return mapping[cat_code]


def parse_irozhlas_category(url):
    cat_code = url.replace("https://www.irozhlas.cz/", "").split("/")[0]
    mapping = {
        "zpravy-domov": CategoryEnum.DOMOV,
        "volby": CategoryEnum.DOMOV,
        "zpravy-svet": CategoryEnum.ZAHRANICI,
        "sport": CategoryEnum.SPORT,
        "ekonomika": CategoryEnum.BYZNYS,
        "kultura": CategoryEnum.KULTURA,
        "zivotni-styl": CategoryEnum.ZIVOTNI_STYL,
        "veda-technologie": CategoryEnum.VEDA,
    }
    return mapping[cat_code]

def parse_denikn_category(url):
    mapping = {
        "https://denikn.cz/cesko/feed/": CategoryEnum.DOMOV,
        "https://denikn.cz/svet/feed": CategoryEnum.ZAHRANICI,
        "https://denikn.cz/sport/feed": CategoryEnum.SPORT,
        "https://denikn.cz/ekonomika/feed": CategoryEnum.BYZNYS,
        "https://denikn.cz/kultura/feed": CategoryEnum.KULTURA,
        "https://denikn.cz/veda/feed": CategoryEnum.VEDA,
    }
    return mapping[url]

def parse_category(url):
    try:
        if "denikn.cz" in url:
            return CategoryEnum.DOMOV
            #return parse_denikn_category(url)
        if "irozhlas.cz" in url:
            return parse_irozhlas_category(url)
        if "lidovky.cz" in url:
            return parse_lidovky_category(url)
        if "ctidoma.cz" in url:
            return parse_ctidoma_category(url)
    except KeyError:
        return CategoryEnum.UNKNOWN


