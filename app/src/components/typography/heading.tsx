import React, { FC } from "react";
import { Text } from "react-native";

import Color from "../../theme/colors";

const Heading: FC = ({ children }) => (
  <Text
    style={{
      fontSize: 36,
      fontFamily: "MondaBold",
      color: Color["black-100"],
    }}
  >
    {children}
  </Text>
);

export default Heading;
