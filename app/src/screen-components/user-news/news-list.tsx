import React, { FC, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  RefreshControl,
  ViewProps,
  Dimensions
} from "react-native";
import Color from "../../theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer from "../../trackPlayer"
import RNTrackPlayer, { Track } from "react-native-track-player";
import PlayerContextProvider, { PlayerContext, usePlayer } from "../../trackPlayerContext";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import { Article } from "../../shared/article";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";

interface Props extends ViewProps {
  selected: boolean
  onPress: (event: GestureResponderEvent) => void
}

const PlusIcon: FC<Props> = ({ style, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <MaterialCommunityIcons name={selected ? 'check' : 'plus'} color={Color["black-32"]} size={24} />
  </TouchableOpacity>
)

interface ItemProps {
  item: Article
  onPress: (item: Article) => void
  onPlusPress: (item: Article) => void
}

const Item: FC<ItemProps> = ({ item, onPress, onPlusPress }) => {
  const theme = useTheme()
  const fonts = useFonts()
  const { state } = usePlayer()

  const [inQueue, setInQueue] = useState(false)

  useEffect(() => {
    const queue = RNTrackPlayer.getQueue().then((queue) => {
      const filtered = queue.filter((value, index, array) => {
        return value.id == item.id
      })
      setInQueue(filtered.length > 0)
    })

  }, [state])


  return (<View style={{ alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 14,
        paddingTop: 14
      }}
    >
      <View style={{ width: 68, height: 50 }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            backgroundColor: 'gray'
          }}
          source={{
            uri: item.img,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => { onPress(item) }}
        style={{
          flex: 1,
          marginStart: 16,
          marginEnd: 8
        }}
      >
        <View style={{}}>
          <Text style={fonts.titleSmall} numberOfLines={2} >
            {item.title}
          </Text>
          <Text style={StyleSheet.compose(fonts.textXSmall, { color: theme.colors.textLight })} >
            {item.published}
          </Text>
        </View>
      </TouchableOpacity>
      <PlusIcon onPress={() => { onPlusPress(item) }} selected={inQueue} />
    </View>
  </View>)
}

const QUERY = gql`
query Articles($first: Int, $after: String, $categories: [ID]) {
	articles(first: $first, after: $after, category_Key_In: $categories) {
    pageInfo{
      hasNextPage,
      endCursor
    },
    edges{
      node {
        id,
        title,
        url: recordingUrl,
        published: pubDate,
        provider {
          name
        }
      }
    }
  }
}
`

interface NewsList extends ViewProps {
  categories: string[]
}

const NewsNavList: FC<NewsList> = ({ style, categories }) => {
  const theme = useTheme()
  const fonts = useFonts()
  const { setQueue } = usePlayer()
  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery(QUERY, {
    variables: {
      first: 30,
      after: '',
      categories: categories
    }
  })
  const [enrichedData, setEnrichedData] = useState([])

  useEffect(() => { refetch() }, [categories])

  const addToQueue = (item: Article) => {
    TrackPlayer.addTrackToQueue(item)
      .then((queue) => {
        setQueue(queue)
        if (queue.length == 1) {
          RNTrackPlayer.play()
        }
      })
  }

  const onItemPress = (item: Article) => addToQueue(item)
  const onPlusPress = (item: Article) => addToQueue(item)

  const renderItem = ({ item }) => {
    return (<Item item={item} onPlusPress={onPlusPress} onPress={onItemPress} />)
  }

  useEffect(() => {
    if (data == undefined) { return }
    const enriched = data.articles.edges.map((item, index) => {
      const randomTrackNumber = Math.floor((Math.random() * 15) + 1)
      return {
        ...item.node,
        img: 'https://picsum.photos/200/140/?id' + item.node.id,
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-' + randomTrackNumber + '.mp3',
        artist: item.node.provider.name
      }
    })
    setEnrichedData(enriched)
  }, [data])

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginStart: 16,
      marginEnd: 16
    }
  })

  const emptyView = () => (
    <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons size={48} name='sad-outline' style={{}} color={theme.colors.textLight} />
      <Text style={StyleSheet.compose(fonts.textReguar, { color: theme.colors.textLight })}>Jsem tak prázdný :(</Text>
    </View>
  )

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
      keyExtractor={(item) => item.id}
      style={StyleSheet.compose({ flex: 1 }, style)}
      ItemSeparatorComponent={
        ({ highlighted }) => (
          <View style={styles.separator}></View>
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={() => {
            refetch()
          }}
        />
      }
      onEndReached={() => {
        fetchMore({
          variables: {
            first: 30,
            after: data.articles.pageInfo.endCursor,
            category: categories
          }
        })
      }}
      onEndReachedThreshold={0.1}

      contentContainerStyle={[{ flexGrow: 1 }, enrichedData.length ? null : { justifyContent: 'center' }]}
      ListEmptyComponent={emptyView}

    />
  )
}

export default NewsNavList
