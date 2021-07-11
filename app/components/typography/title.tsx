import React, { FC } from "react";
import { Text } from "react-native";
import Color from "../../shared/colors";

interface Props {
  size: 1 | 2 | 3;
  color?: Color | string;
}

const Title: FC<Props> = ({ children, size, color }) => (
  <Text
    style={{
      fontSize: size === 3 ? 18 : 16,
      lineHeight: size === 3 ? 24 : 22,
      fontFamily: "RobotoBold",
      color: color || Color["black-100"],
    }}
  >
    {children}
  </Text>
);

export default Title;
