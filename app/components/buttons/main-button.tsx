import React, { FC } from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Color from "../../shared/colors";

interface Props {
  style?: ViewStyle;
  onPress(): void;
}

const MainButton: FC<Props> = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Color["black-100"],
        borderRadius: 40,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        ...style,
      }}
      onPress={onPress}
    >
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
      <FontAwesome5 name="chevron-right" size={12} color="white" />
    </TouchableOpacity>
  );
};

export default MainButton;
