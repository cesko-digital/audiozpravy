import React, { FC } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Color from "../../theme/colors";
import {
  ListeningPost,
  CollectionPost,
  CategoryPost,
  JoinedPost,
} from "./posts";

const articles = [
  {
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    published: "DNES 14:35",
    collection: {
      title: "Dnešní zprávy",
      subtitle: "Nejdůležitější zprávy dne",
    },
    category: "koronavirus",
    type: "listening",
  },
  {
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    published: "DNES 14:35",
    collection: {
      title: "Dnešní zprávy",
      subtitle: "Nejdůležitější zprávy dne",
    },
    category: "koronavirus",
    type: "joined",
  },
  {
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    published: "DNES 14:35",
    collection: {
      title: "Dnešní zprávy",
      subtitle: "Nejdůležitější zprávy dne",
    },
    category: "koronavirus",
    type: "collection",
  },
  {
    title:
      "Tři největší obavy z očkování: šťavnatým soustem pro konspirátory je...",
    img: "https://placekitten.com/200/139",
    published: "DNES 14:35",
    collection: {
      title: "Dnešní zprávy",
      subtitle: "Nejdůležitější zprávy dne",
    },
    category: "koronavirus",
    type: "category",
  },
];

const FriendsNavList = ({ topic }) => {
  const renderListeningPost = ({ item }) => (
    <ListeningPost
      title={item.title}
      img={item.img}
      published={item.published}
      name="Jarmila Kováčová"
    />
  );
  const renderCollectionPost = ({ item }) => (
    <CollectionPost
      collection={item.collection}
      img={item.img}
      name="Radek Lenoch"
    />
  );
  const renderCategoryPost = ({ item }) => (
    <CategoryPost category={item.category} name="Kamila zpěváčková" />
  );
  const renderJoinedPost = ({ item }) => <JoinedPost name="Pavel Krčmář" />;
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
        renderItem={({ item, index }) => {
          switch (item.type) {
            case "listening":
              return renderListeningPost({ item });
            case "joined":
              return renderJoinedPost({ item });
            case "collection":
              return renderCollectionPost({ item });
            case "category":
              return renderCategoryPost({ item });
            default:
              break;
          }
        }}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default FriendsNavList;
