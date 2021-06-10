import React, { FC } from "react";
import { Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Color from "../../shared/colors";

const LoginLink: FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoLight",
          fontWeight: "300",
          color: Color["black-100"],
        }}
      >
        Už máte účet?
      </Text>
      <TouchableOpacity onPress={() => {}} style={{ marginLeft: 3 }}>
        <Text style={{ fontFamily: "RobotoBold", color: Color["black-100"] }}>
          Přihlaste se
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginLink;
