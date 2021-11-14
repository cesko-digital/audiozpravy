import React from "react";
import { Text, View } from "react-native";
import Color from "../../theme/colors";
import TabViewFriends from "./friends-tabview";

const FriendsScreen = () => {
  return (
    <View
    style={{
      flex: 1,
      backgroundColor: "white"
    }}
  >
    <View
      style={{
        paddingStart: 16,
        paddingTop: 24,
        paddingBottom: 8
      }}
    >
      <Text
        style={{
          color: Color["black-100"],
          fontFamily: "RobotoBold",
          fontSize: 24,
        }}
      >
          Přátelé
        </Text>
      </View>
      <TabViewFriends />
    </View>
  );
};

export default FriendsScreen;
