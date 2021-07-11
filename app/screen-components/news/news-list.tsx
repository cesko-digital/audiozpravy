import React, { FC } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Color from "../../shared/colors";

const articles = [
  {
    title: "Vláda zřejmě odmítne Babišův návrh na zmrazení platů.",
    img: "https://placekitten.com/200/139",
    published: "DNES 15:30",
  },
  {
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    published: "DNES 14:35",
  },
  {
    title:
      "Babiš se odmítl omluvit Pirátům za výrok, že chtějí k lidem nastěhovat migranty.",
    img: "https://placekitten.com/200/139",
    published: "DNES 13:10",
  },
  {
    title:
      "Lidice si připomněly 79 let od vyhlazení obce nacisty, věnce položili také politici",
    img: "https://placekitten.com/200/139",
    published: "DNES 12:55",
  },
  {
    title: "Přes dva miliony lidí má v Česku ukončené očkování...",
    img: "https://placekitten.com/200/139",
    published: "DNES 12:39",
  },
];

interface Props {
  style?: TextStyle;
}

const PlusIcon: FC<Props> = ({ style }) => (
  <TouchableOpacity
    onPress={() => alert("Přidáno do fronty!")}
    style={{
      height: "10%",
      width: "10%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <View style={{}}>
      <Text
        style={{
          fontSize: 28,
          fontFamily: "RobotoLight",
          color: Color["black-32"],
          fontWeight: "500",
          ...style,
        }}
      >
        +
      </Text>
    </View>
  </TouchableOpacity>
);

const Item = ({ title, img, published }) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "95%",
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
      }}
    >
      <View style={{ width: "4.5rem", height: "3rem" }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          source={{
            uri: img,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => alert("Chci zobrazit zprávu!")}
        style={{
          width: "60%",
        }}
      >
        <View>
          <Text
            style={{ fontFamily: "RobotoBold", fontSize: 14, lineHeight: 20 }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoLight",
              fontSize: 10,
              lineHeight: 16,
              color: Color["black-24"],
            }}
          >
            {published}
          </Text>
        </View>
      </TouchableOpacity>
      <PlusIcon />
    </View>
  </View>
);

const NewsNavList = ({ topic }) => {
  const renderItem = ({ item }) => (
    <Item title={item.title} img={item.img} published={item.published} />
  );
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default NewsNavList;
