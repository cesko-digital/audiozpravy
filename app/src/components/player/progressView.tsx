import React, { FC, useRef } from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  Animated,
  useWindowDimensions,
} from "react-native";
import Color from "../../theme/colors";

interface Props extends ViewProps {
  currentSecond: number;
  totalSeconds: number;
}

export const ProgressView: FC<Props> = ({ currentSecond, totalSeconds }) => {
  const position = useRef(new Animated.Value(0)).current;
  const { height, width } = useWindowDimensions();

  const translateX = position.interpolate({
    inputRange: [0, totalSeconds],
    outputRange: [-width, 0],
    extrapolate: "clamp",
  });
  Animated.timing(position, {
    toValue: currentSecond,
    duration: 10,
    useNativeDriver: true,
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
            width: "100%",
            transform: [{ translateX: translateX }],
          },
        ]}
      ></Animated.View>
    </View>
  );
};
