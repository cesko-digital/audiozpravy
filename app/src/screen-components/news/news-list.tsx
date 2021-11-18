import React, { FC } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";
import Color from "../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer from "../../trackPlayer"
import { Track } from "react-native-track-player";

const articles = [
  {
    id: 1,
    title: "Nový šéf ÚOHS sliboval obnovu důvěry. Ve funkci nechává klid",
    img: "https://placekitten.com/200/139",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "au",
    published: "DNES 15:30",
  },
  {
    id: 2,
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "au",
    published: "DNES 14:35",
  },
  {
    id: 3,
    title:
      "Babiš se odmítl omluvit Pirátům za výrok, že chtějí k lidem nastěhovat migranty.",
    img: "https://placekitten.com/200/139",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "au",
    published: "DNES 13:10",
  },
  {
    id: 4,
    title:
      "Lidice si připomněly 79 let od vyhlazení obce nacisty, věnce položili také politici",
    img: "https://placekitten.com/200/139",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artist: "au",
    published: "DNES 12:55",
  },
  {
    id: 5,
    title: "Přes dva miliony lidí má v Česku ukončené očkování...",
    img: "https://placekitten.com/200/139",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artist: "au",
    published: "DNES 12:39",
  },
];

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
);

interface Item extends Track {
  title: string
  img: string
  published: string
}

interface ItemProps {
  item: Item
}

const Item: FC<ItemProps> = ({ item }) => (
  <View style={{ alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 14,
        paddingTop: 14,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
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
        onPress={() => alert("Chci zobrazit zprávu!")}
        style={{
          flex: 1,
          marginStart: 16,
          marginEnd: 8
        }}
      >
        <View style={{}}>
          <Text
            style={{ fontWeight: '700', fontSize: 14, lineHeight: 20 }}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 10,
              lineHeight: 16,
              color: Color["black-24"],
            }}
          >
            {item.published}
          </Text>
        </View>
      </TouchableOpacity>
      <PlusIcon onPress={() => {
        TrackPlayer.addTrackToQueue(item)
      }} />
    </View>
  </View>
);

const NewsNavList = ({ topic }) => {
  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      style={{ flex: 1 }}
    />
  );
};

export default NewsNavList;
