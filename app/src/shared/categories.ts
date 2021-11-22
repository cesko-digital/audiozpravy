import { ImageSourcePropType } from "react-native"

export interface ArticleCategory {
    id: number
    title: string
    key: string
    colors: string[]
    image: ImageSourcePropType
}


const categories: ArticleCategory[] = [
    {
        id: 1,
        title: 'Domov',
        key: 'domov',
        colors: ['#231557', '#44107A', '#FF1361'],
        image: require('../../assets/images/categories/domov.jpg')
    },
    {
        id: 2,
        title: 'Sport',
        key: 'sport',
        colors: ['#16A085', '#F4D03F'],
        image: require('../../assets/images/categories/sport.jpg')
    },
    {
        id: 3,
        key: '5min',
        title: '5minutovka na míru',
        colors: ['#FF5858', '#F09819'],
        image: null
    },
    {
        id: 4,
        title: 'Zahraničí',
        key: 'zahranici',
        colors: ['#A32E25', '#C76258', '#D14B00', '#741F15', '#7D0E23', '#770931'],
        image: require('../../assets/images/categories/zahranici.jpg')
    },
    {
        id: 5,
        title: 'Byznys',
        key: 'byznys',
        colors: ['#0C3483', '#A2B6DF', '#6B8CCE'],
        image: require('../../assets/images/categories/byznys.jpg')
    },
    {
        id: 6,
        key: 'kultura',
        title: 'Kultura',
        colors: ['#C71D6F', '#D09693'],
        image: require('../../assets/images/categories/kultura.jpg')
    },
    {
        id: 7,
        key: 'zdravi',
        title: 'Zdraví',
        colors: ['#0F6489', '#FFE6FA'],
        image: require('../../assets/images/categories/zdravi.jpg')
    },
    {
        id: 8,
        key: 'cestovani',
        title: 'Cestování',
        colors: ['#0E9B74', '#72AFD3'],
        image: require('../../assets/images/categories/cestovani.jpg')
    },
    {
        id: 9,
        key: 'relax',
        title: 'Relax',
        colors: ['#667EEA', '#764BA2'],
        image: require('../../assets/images/categories/relax.jpg')
    },
    {
        id: 10,
        key: 'veda',
        title: 'Věda',
        colors: ['#00C6FB', '#005BEA'],
        image: require('../../assets/images/categories/veda.jpg')
    },
    {
        id: 11,
        key: 'auto',
        title: 'Auto',
        colors: ['#29323C', '#485563'],
        image: require('../../assets/images/categories/auto.jpg')
    },
    {
        id: 12,
        key: 'historie',
        title: 'Historie',
        colors: ['#445060', '#ADD2FF'],
        image: require('../../assets/images/categories/historie.jpg')
    },
    {
        id: 13,
        key: 'zivotni-styl',
        title: 'Životní styl',
        colors: ['#44382C', '#E2D1C3'],
        image: require('../../assets/images/categories/zivotni-styl.jpg')
    },
]

export default categories