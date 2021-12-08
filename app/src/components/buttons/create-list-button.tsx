import React, { FC } from "react";
import { Text, TouchableOpacity, ViewStyle, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Color from "../../theme/colors";

interface Props {
  style?: ViewStyle;
  onPress(): void;
}

const CreateListButton: FC<Props> = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderColor: Color["black-100"],
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: Color["black-100"],
          width: 20,
          height: 20,
          borderRadius: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <FontAwesome5 name="times" size={12} color="white" />
      </View>

      <Text
        style={{
          color: Color["black-100"],
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

export default CreateListButton;
