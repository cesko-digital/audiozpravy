import React from "react";
import { Text, View } from "react-native";
import Player from "../components/player";

const QueueScreen = ({ navigation }) => {
  return (
    <View style={{ position: "relative", height: "100%", width: "100%" }}>
      <Text>Queue</Text>
      <Player
        queue={[]}
        style={{ position: "absolute", bottom: 0 }}
        hideDescription
        hideQueue
      ></Player>
    </View>
  );
};

export default QueueScreen;
