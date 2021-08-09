import React, { FC } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import Color from "../../shared/colors";

const Description: FC<TextProps> = ({ children, style, ...rest }) => (
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
    {...rest}
  >
    {children}
  </Text>
);

export default Description;
