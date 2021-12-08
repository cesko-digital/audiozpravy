import React, { FC } from "react";
import { Text, TouchableOpacity, ViewStyle, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Color from "../../theme/colors";

interface Props {
  style?: ViewStyle;
  onPress(): void;
}

const PlaySelectedButton: FC<Props> = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "black",
        opacity: 1,
        borderRadius: 12,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginBottom: 20,
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: "white",
          width: 20,
          height: 20,
          borderRadius: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <FontAwesome5 name="play" size={8} color={Color["black-100"]} />
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 16,
          lineHeight: 24,
          marginRight: 8,
          fontFamily: "RobotoBold",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default PlaySelectedButton;
