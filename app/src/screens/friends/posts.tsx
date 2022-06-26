import React from "react";
import { Text, View, Image, TouchableOpacity, ViewStyle } from "react-native";
import Color from "../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = { title: string; img: string; published: string; name: string };

export const ListeningPost = ({ title, img, published, name }: Props) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <View
      style={{
        width: "100%",
        paddingTop: 15,
        paddingLeft: 10,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontFamily: "RobotoLight",
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {name} právě poslouchá:
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "95%",
        paddingBottom: 15,
        paddingTop: 10,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: 80,
          height: 60,
          paddingRight: 15,
          position: "relative",
        }}
      >
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
        <TouchableOpacity
          onPress={() => alert("Chci spustit přehrávání!")}
          style={{
            ...buttonStyle,
            height: 30,
            width: 30,
            backgroundColor: "black",
            position: "absolute",
            top: 15,
            left: 20,
          }}
        >
          <MaterialCommunityIcons name="play" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => alert("Chci zobrazit zprávu!")}
        style={{
          width: "80%",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text
            style={{ fontFamily: "RobotoBold", fontSize: 14, lineHeight: 20 }}
            numberOfLines={2}
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
    </View>
  </View>
);

type Collection = {
  title: string;
  subtitle: string;
};

type ColllectionProps = {
  collection: Collection;
  img: string;
  name: string;
};

export const CollectionPost = ({ collection, img, name }: ColllectionProps) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <View style={{ width: "100%", paddingTop: 15, paddingLeft: 10 }}>
      <Text
        style={{
          textAlign: "left",
          fontFamily: "RobotoLight",
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {name} si právě pustil kolekci:
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "95%",
        paddingBottom: 15,
        paddingTop: 10,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: 160,
          height: 60,
          paddingRight: 15,
          position: "relative",
        }}
      >
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
        <TouchableOpacity
          onPress={() => alert("Chci spustit přehrávání!")}
          style={{
            ...buttonStyle,
            height: 30,
            width: 30,
            backgroundColor: Color["black-100"],
            position: "absolute",
            top: 15,
            left: 20,
          }}
        >
          <MaterialCommunityIcons name="play" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => alert("Chci zobrazit zprávu!")}
        style={{
          width: "80%",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text
            style={{ fontFamily: "RobotoBold", fontSize: 14, lineHeight: 20 }}
            numberOfLines={2}
          >
            {collection.title}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoLight",
              fontSize: 12,
              lineHeight: 16,
              color: Color["black-100"],
            }}
          >
            {collection.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

type CategoryProps = {
  category: string;
  name: string;
};

export const CategoryPost = ({ category, name }: CategoryProps) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <View
      style={{
        width: "100%",
        paddingTop: 15,
        paddingLeft: 10,
        paddingBottom: 15,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontFamily: "RobotoLight",
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {name} sleduje
      </Text>
      <TouchableOpacity onPress={() => alert("Chci zobrazit kategorii!")}>
        <View
          style={{
            backgroundColor: Color["blue"],
            borderRadius: 40,
            width: 102,
            height: 36,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBold",
              fontSize: 14,
              lineHeight: 20,
              color: "white",
            }}
          >
            {category}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

type JoinedProps = { name: string };

export const JoinedPost = ({ name }: JoinedProps) => (
  <View style={{ width: "100%", alignItems: "center" }}>
    <View
      style={{
        width: "100%",
        paddingTop: 15,
        paddingLeft: 10,
        paddingBottom: 15,
        borderBottomColor: Color["grey"],
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontFamily: "RobotoLight",
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {name} se připojil
      </Text>
      <TouchableOpacity onPress={() => alert("Chci začít sledovat!")}>
        <View
          style={{
            backgroundColor: Color["black-100"],
            borderRadius: 12,
            width: 121,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBold",
              fontSize: 14,
              lineHeight: 20,
              color: "white",
            }}
          >
            Začít sledovat
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const buttonStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
