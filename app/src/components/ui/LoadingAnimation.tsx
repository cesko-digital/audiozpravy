import React, { FC, useRef } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation: FC<ViewProps> = ({ style }) => {
  const animation = useRef(null);
  return (
    <View
      style={StyleSheet.compose(
        {
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        },
        style
      )}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#fff",
        }}
        source={require("assets/loading_animation.json")}
      />
    </View>
  );
};

export default LoadingAnimation;
