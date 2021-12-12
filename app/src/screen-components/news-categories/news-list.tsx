import React, { FC, useState, useRef, useEffect } from "react"
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  RefreshControl
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient'
import categories, { ArticleCategory } from '../../shared/categories'
import { useTheme } from "../../theme"
import useFonts from "../../theme/fonts"
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { Article } from "../../shared/article";
import TrackPlayer, { } from "../../trackPlayer"
import RNTrackPlayer from "react-native-track-player";

const CATEGORIES_TODAY = gql`
{
 playlistsForToday {
  category { key },
  articles { id, url: recordingUrl, title, artist: provider {name} },
  preparedForDate, createdAt, type
	}
}`

const CATEGORIES_WEEK = gql`
{
 playlistsForThisWeek {
  category { key },
  articles { id, url: recordingUrl, title, artist: provider {name} },
  preparedForDate, createdAt, type
	}
}`


export enum ScreenVariant {
  today,
  week
}

interface GridProps {
  images: string[]
}

const ImageGrid: FC<GridProps> = ({ images }) => {
  const theme = useTheme()

  const imageOpacity = useRef(new Animated.Value(0)).current
  const [showImages, setShowImages] = useState(false)
  const loadingState = useRef(Array(9).fill(false)).current

  useEffect(() => {
    if (showImages) {
      Animated.timing(imageOpacity, {
        duration: 300,
        toValue: 1,
        easing: Easing.cubic,
        useNativeDriver: false
      }).start()
    }
  }, [showImages])

  const onLoad = (index: number) => {
    return () => {
      loadingState[index] = true
      var isLoaded = loadingState.every(Boolean)
      if (isLoaded) {
        setShowImages(true)
      }
    }
  }

  const onError = (index: number) => {
    return (error) => {
      console.error('failed to load image')
    }
  }

  const style = StyleSheet.create({
    container: {
      width: 42,
      height: 30,
      borderRadius: 8,
      backgroundColor: theme.colors.skeletonLight,
      marginStart: 4,
    },
    image: {
      width: 42,
      height: 30,
      borderRadius: 8,
      position: 'absolute',
      resizeMode: 'contain'
    }
  })

  return (
    <View style={{ alignItems: 'flex-start', marginEnd: 24 }}>
      {Array(3).fill(null).map((value, row) => (
        <View key={'r' + row} style={{ flexDirection: 'row', marginTop: row > 0 ? 4 : 0 }}>
          {Array(3).fill(null).map((value, column) => {
            const imagePosition = (row * 3) + column
            return (
              <View key={'i' + imagePosition} style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[imagePosition] }} onLoad={onLoad(imagePosition)} onError={onError(imagePosition)}></Animated.Image></View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

interface Props {
  item: ArticleCategory
  weekNumber: string,
  images: string[],
  onPress: (item: ArticleCategory) => void
}

const GradientCard: FC<Props> = ({ item, weekNumber, images, onPress }) => {
  const fonts = useFonts()
  const theme = useTheme()

  return (
    <View
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        paddingStart: 16,
        paddingEnd: 16,
      }}>

      <TouchableOpacity
        style={{}}
        onPress={() => {
          onPress(item)
          //alert('playlist added to queue')
        }}
      >
        <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 8 }}>
          {(item.image != null) &&
            <Image source={item.image} style={{ width: '100%', height: 124, position: 'absolute', opacity: 0.25 }} />
          }
          <View style={{ height: (item.image != null) ? 124 : 74, justifyContent: 'center', flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 16 }}>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 30
                }}
              >
                <MaterialCommunityIcons name="play" color="black" size={24} />
              </View>

              <View style={{ alignItems: 'flex-start', marginStart: 8, flex: 1 }}>
                <Text
                  key={'category-title-' + item.id}
                  style={StyleSheet.compose(fonts.titleLarge, { color: theme.colors.textInverse })}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row', backgroundColor: item.colors[0], paddingHorizontal: 4, paddingVertical: 3 }}>
                  <FontAwesome5 name="clock" color='#FFF4B9' size={15} />
                  <Text style={StyleSheet.compose(fonts.titleXSmall, { marginStart: 4, color: '#FFF4B9' })}>{weekNumber != null ? weekNumber : 'DNES'}</Text>
                </View>
              </View>

              {(item.image != null) &&
                <ImageGrid images={images}></ImageGrid>
              }

            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const Item: FC<Props> = ({ item, weekNumber, images, onPress }) => (
  <View style={{}}>
    <GradientCard item={item} weekNumber={weekNumber} images={images} onPress={onPress} />
  </View>
)

interface NavListProps {
  variant: ScreenVariant
}

const NewsNavList: FC<NavListProps> = ({ variant }) => {
  const query = variant == ScreenVariant.today ? CATEGORIES_TODAY : CATEGORIES_WEEK
  const { data, loading, error, refetch, networkStatus } = useQuery(query, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache'
  })
  const [enrichedData, setEnrichedData] = useState([])

  console.info('NewsNavList')

  useEffect(() => {
    setEnrichedData(enrichData(data))
  }, [data])

  const enrichData = (data) => {
    const dataCollection = variant == ScreenVariant.today ? data?.playlistsForToday : data?.playlistsForThisWeek
    const enrichedData = dataCollection?.map((d, index) => {
      const category = categories.filter((c) => { return c.key == d.category.key })[0]
      if (category) {
        var articles = d.articles.slice(0, 9).map((i) => {
          const randomTrackNumber = Math.floor((Math.random() * 15) + 1)
          return {
            ...i,
            artist: i.artist.name,
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-' + randomTrackNumber + '.mp3',
          }
        })
        const enriched = { ...category, articles: articles }
        return enriched
      }
      return null
    }).filter(n => n)
    return enrichedData
  }

  const addToQueue = (items: Article[]) => {
    TrackPlayer.addTracksToQueue(items)
      .then((queue) => {
        RNTrackPlayer.play()
      })
  }

  const onItemPress = (item: ArticleCategory) => {
    addToQueue(item.articles)
    console.info('onItemPress', item.articles)
  }

  const renderItem = ({ item }) => {
    // sample data
    const dayNumber = new Date().getDay()
    const weekLabel = dayNumber == 0 ? 'Minulý týden' : 'Tento týden'
    const weekNumber = (variant == ScreenVariant.week) ? weekLabel : null
    const timestamp = variant.toString + item.key
    const sampleImages = [
      // 'https://picsum.photos/126/90/?a' + timestamp,
      // 'https://picsum.photos/126/90/?b' + timestamp,
      // 'https://picsum.photos/126/90/?c' + timestamp,
      // 'https://picsum.photos/126/90/?d' + timestamp,
      // 'https://picsum.photos/126/90/?e' + timestamp,
      // 'https://picsum.photos/126/90/?f' + timestamp,
      // 'https://picsum.photos/126/90/?g' + timestamp,
      // 'https://picsum.photos/126/90/?h' + timestamp,
      // 'https://picsum.photos/126/90/?i' + timestamp
    ]
    return (<Item item={item} weekNumber={weekNumber} images={sampleImages} onPress={onItemPress} />)
  }

  if (loading) {
    return (<Text>Loading....</Text>)
  }

  if (error) {
    return (<Text>Error {error.message}</Text>)
  }

  return (
    <FlatList
      data={enrichedData}
      renderItem={renderItem}
      keyExtractor={(item) => String('topicID-' + item.key + '-' + variant.toString())}
      style={{}}
      refreshControl={
        <RefreshControl
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={() => {
            console.log('on refresh')
            refetch()
          }}
        />
      }
    />
  )
}

export default NewsNavList
