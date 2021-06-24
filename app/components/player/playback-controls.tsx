import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../../shared/colors";

interface Props extends ViewProps {
  onRewind(): void;
  onPlayPause(): void;
  onNext(): void;
}

const PlaybackControls: FC<Props> = ({
  onRewind,
  onPlayPause,
  onNext,
  style,
}) => {
  return (
    <View
      style={StyleSheet.compose(
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        style
      )}
    >
      <TouchableOpacity
        onPress={onRewind}
        style={StyleSheet.compose(buttonStyle, { height: 40, width: 40 })}
      >
        <MaterialCommunityIcons
          name="rewind-10"
          color={Color["black-100"]}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPlayPause}
        style={{
          ...buttonStyle,
          height: 47,
          width: 47,
          marginHorizontal: 28,
        }}
      >
        <MaterialCommunityIcons
          name="play"
          color={Color["black-100"]}
          size={46}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        style={{ ...buttonStyle, height: 40, width: 40 }}
      >
        <MaterialCommunityIcons
          name="skip-next"
          color={Color["black-100"]}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlaybackControls;

const buttonStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
