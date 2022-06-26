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

type FriendArticle = {
  key: string;
  title: string;
  img: string;
  published: string;
  collection: {
    title: string;
    subtitle: string;
  };
  category: string;
  type: string;
};

const articles: FriendArticle[] = [
  {
    key: "1",
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
    key: "1",
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
    key: "1",
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
    key: "1",
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

type FriendsProps = {
  topic: string;
};

type Props = {
  item: any;
};

const FriendsNavList = ({}: FriendsProps) => {
  const renderListeningPost = ({ item }: Props) => (
    <ListeningPost
      title={item.title}
      img={item.img}
      published={item.published}
      name="Jarmila Kováčová"
    />
  );
  const renderCollectionPost = ({ item }: Props) => (
    <CollectionPost
      collection={item.collection}
      img={item.img}
      name="Radek Lenoch"
    />
  );
  const renderCategoryPost = ({ item }: Props) => (
    <CategoryPost category={item.category} name="Kamila zpěváčková" />
  );
  const renderJoinedPost = ({}) => <JoinedPost name="Pavel Krčmář" />;

  const renderItem = ({ item }: { item: FriendArticle }) => {
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
        return null;
    }
  };

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

export default FriendsNavList;
