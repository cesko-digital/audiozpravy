import React, { FC, useRef } from "react";
import { StyleSheet, View, ViewProps, Animated } from "react-native";
import Color from "../../theme/colors";

interface Props extends ViewProps {
  currentSecond: number;
  totalSeconds: number;
}

export const ProgressView: FC<Props> = ({ currentSecond, totalSeconds }) => {
  const position = useRef(new Animated.Value(0)).current;

  const width = position.interpolate({
    inputRange: [0, totalSeconds],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  Animated.timing(position, {
    toValue: currentSecond,
    duration: 10,
    useNativeDriver: false,
  }).start();

  return (
    <View style={{ height: 8, backgroundColor: Color["black-16"] }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            borderTopEndRadius: 4,
            borderBottomEndRadius: 4,
            backgroundColor: Color["black-64"],
            width,
          },
        ]}
      ></Animated.View>
    </View>
  );
};
