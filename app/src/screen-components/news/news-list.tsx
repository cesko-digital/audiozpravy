import React, { FC, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet
} from "react-native";
import Color from "../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer from "../../trackPlayer"
import { Track } from "react-native-track-player";
import PlayerContextProvider, { PlayerContext, usePlayer } from "../../trackPlayerContext";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'


interface Item extends Track {
  img: string
  published: string
}

const articles: Item[] = [
  {
    id: 1,
    title: "Nový šéf ÚOHS sliboval obnovu důvěry. Ve funkci nechává klid",
    img: "http://lorempixel.com/200/140/?a",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "au",
    published: "DNES 15:30",
  },
  {
    id: 2,
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "http://lorempixel.com/200/140/?b",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "au",
    published: "DNES 14:35",
  },
  {
    id: 3,
    title:
      "Babiš se odmítl omluvit Pirátům za výrok, že chtějí k lidem nastěhovat migranty.",
    img: "http://lorempixel.com/200/140/?c",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "au",
    published: "DNES 13:10",
  },
  {
    id: 4,
    title:
      "Lidice si připomněly 79 let od vyhlazení obce nacisty, věnce položili také politici",
    img: "http://lorempixel.com/200/140/?d",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artist: "au",
    published: "DNES 12:55",
  },
  {
    id: 5,
    title: "Přes dva miliony lidí má v Česku ukončené očkování...",
    img: "http://lorempixel.com/200/140/?e",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artist: "au",
    published: "DNES 12:39",
  }
]

interface Props {
  style?: TextStyle;
  onPress: (event: GestureResponderEvent) => void
}


const PlusIcon: FC<Props> = ({ style, onPress }) => (
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
    <MaterialCommunityIcons name="plus" color={Color["black-32"]} size={24} />
  </TouchableOpacity>
)

interface ItemProps {
  item: Item
  onPress: (item: Item) => void
  onPlusPress: (item: Item) => void
}

const Item: FC<ItemProps> = ({ item, onPress, onPlusPress }) => {
  const theme = useTheme();
  const fonts = useFonts();

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
            borderRadius: 10
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
      <PlusIcon onPress={() => { onPlusPress(item) }} />
    </View>
  </View>)
}

const NewsNavList = ({ topic }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const { state, setQueue } = usePlayer()

  const addToQueue = (item: Item) => {
    TrackPlayer.addTrackToQueue(item)
      .then((queue) => {
        setQueue(queue)
      })
  }

  const onItemPress = (item: Item) => addToQueue(item)
  const onPlusPress = (item: Item) => addToQueue(item)

  const renderItem = ({ item }) => (
    <Item item={item} onPlusPress={onPlusPress} onPress={onItemPress} />
  )

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginStart: 16,
      marginEnd: 16
    }
  })

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={{ flex: 1 }}
      ItemSeparatorComponent={
        ({ highlighted }) => (
          <View style={styles.separator}></View>
        )
      }
    />
  )
}

export default NewsNavList
