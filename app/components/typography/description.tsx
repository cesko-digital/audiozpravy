import React, { FC } from "react";
import { Text, TextStyle } from "react-native";
import Color from "../../shared/colors";

interface Props {
  style?: TextStyle;
}

const Description: FC<Props> = ({ children, style }) => (
  <Text
    style={{
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "RobotoLight",
      color: Color["black-100"],
      ...style,
    }}
  >
    {children}
  </Text>
);

export default Description;
