import React, { FC } from "react";
import { View, ViewStyle } from "react-native";

import Heading from "../../components/typography/heading";

import Color from "../../theme/colors";

const Title: FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View
      style={{
        borderLeftWidth: 4,
        borderLeftColor: Color["black-16"],
        paddingLeft: 6,
        ...style,
      }}
    >
      <Heading>Audio zprávy</Heading>
    </View>
  );
};

export default Title;
