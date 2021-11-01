import React from "react";
import { Text, View } from "react-native";
import Color from "../../shared/colors";
import TabViewNews from "./news-tabview";

const NewsScreen = () => {
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
            Nejnovější zprávy
          </Text>
        </View>
        <TabViewNews />
      </View>
  );
};

export default NewsScreen;
