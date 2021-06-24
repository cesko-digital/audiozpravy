import React, { FC } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import Color from "../../shared/colors";

const Description: FC<TextProps> = ({ children, style }) => (
  <Text
    style={StyleSheet.compose(
      {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "RobotoLight",
        color: Color["black-100"],
        fontWeight: "300",
      },
      style
    )}
  >
    {children}
  </Text>
);

export default Description;
