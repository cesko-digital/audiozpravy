import React from "react";
import { Text, View } from "react-native";
import Color from "../../shared/colors";
import TabViewNews from "./news-tabview";

const NewsScreen = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "90%",
            height: "5%",
            left: 16,
            top: 24,
            zIndex: 10,
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
    </>
  );
};

export default NewsScreen;
