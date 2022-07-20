import { ImageSourcePropType } from "react-native";
import { Article } from "./article";

export interface ArticleCategory {
  id: number;
  title: string;
  key: string;
  colors: string[];
  image: ImageSourcePropType | null;
  articles: Article[];
  images: string[] | null;
}

function getSampleImages(categoryKey: string) {
  const sampleImages: string[] = [
    "https://picsum.photos/126/90/?a" + categoryKey,
    "https://picsum.photos/126/90/?b" + categoryKey,
    "https://picsum.photos/126/90/?c" + categoryKey,
    "https://picsum.photos/126/90/?d" + categoryKey,
    "https://picsum.photos/126/90/?e" + categoryKey,
    "https://picsum.photos/126/90/?f" + categoryKey,
    "https://picsum.photos/126/90/?g" + categoryKey,
    "https://picsum.photos/126/90/?h" + categoryKey,
    "https://picsum.photos/126/90/?i" + categoryKey,
  ];
  return sampleImages;
}

const categories: ArticleCategory[] = [
  {
    id: 1,
    title: "Domov",
    key: "domov",
    colors: ["#231557", "#44107A", "#FF1361"],
    image: require("../../assets/images/categories/domov.jpg"),
    articles: [],
    images: getSampleImages("domov"),
  },
  {
    id: 2,
    title: "Sport",
    key: "sport",
    colors: ["#16A085", "#F4D03F"],
    image: require("../../assets/images/categories/sport.jpg"),
    articles: [],
    images: getSampleImages("sport"),
  },
  {
    id: 3,
    key: "5min",
    title: "5minutovka na míru",
    colors: ["#FF5858", "#F09819"],
    image: null,
    articles: [],
    images: getSampleImages("5min"),
  },
  {
    id: 4,
    title: "Zahraničí",
    key: "zahranici",
    colors: ["#A32E25", "#C76258", "#D14B00", "#741F15", "#7D0E23", "#770931"],
    image: require("../../assets/images/categories/zahranici.jpg"),
    articles: [],
    images: getSampleImages("zahranici"),
  },
  {
    id: 5,
    title: "Byznys",
    key: "byznys",
    colors: ["#0C3483", "#A2B6DF", "#6B8CCE"],
    image: require("../../assets/images/categories/byznys.jpg"),
    articles: [],
    images: getSampleImages("byznys"),
  },
  {
    id: 6,
    key: "kultura",
    title: "Kultura",
    colors: ["#C71D6F", "#D09693"],
    image: require("../../assets/images/categories/kultura.jpg"),
    articles: [],
    images: getSampleImages("kultura"),
  },
  {
    id: 7,
    key: "zdravi",
    title: "Zdraví",
    colors: ["#0F6489", "#FFE6FA"],
    image: require("../../assets/images/categories/zdravi.jpg"),
    articles: [],
    images: getSampleImages("zdravi"),
  },
  {
    id: 8,
    key: "cestovani",
    title: "Cestování",
    colors: ["#0E9B74", "#72AFD3"],
    image: require("../../assets/images/categories/cestovani.jpg"),
    articles: [],
    images: getSampleImages("cestovani"),
  },
  {
    id: 9,
    key: "relax",
    title: "Relax",
    colors: ["#667EEA", "#764BA2"],
    image: require("../../assets/images/categories/relax.jpg"),
    articles: [],
    images: getSampleImages("relax"),
  },
  {
    id: 10,
    key: "veda",
    title: "Věda",
    colors: ["#00C6FB", "#005BEA"],
    image: require("../../assets/images/categories/veda.jpg"),
    articles: [],
    images: getSampleImages("veda"),
  },
  {
    id: 11,
    key: "auto",
    title: "Auto",
    colors: ["#29323C", "#485563"],
    image: require("../../assets/images/categories/auto.jpg"),
    articles: [],
    images: getSampleImages("auto"),
  },
  {
    id: 12,
    key: "historie",
    title: "Historie",
    colors: ["#445060", "#ADD2FF"],
    image: require("../../assets/images/categories/historie.jpg"),
    articles: [],
    images: getSampleImages("historie"),
  },
  {
    id: 13,
    key: "zivotni-styl",
    title: "Životní styl",
    colors: ["#44382C", "#E2D1C3"],
    image: require("../../assets/images/categories/zivotni-styl.jpg"),
    articles: [],
    images: getSampleImages("zivotni-styl"),
  },
];

export default categories;
