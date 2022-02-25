import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import PlaybackTime from "../playback-time";
import Slider from "@react-native-community/slider";
import Color from "../../theme/colors";

interface Props extends ViewProps {
  currentSecond: number;
  buffered: number;
  totalSeconds: number;
  onChange(handlePos: number): void;
}

const SeekProgressBar: FC<Props> = ({
  currentSecond,
  buffered,
  totalSeconds,
  style,
  onChange,
}) => {
  const bufferedWidth = String((buffered / totalSeconds) * 100) + "%";
  return (
    <View
      style={StyleSheet.compose(
        { display: "flex", flexDirection: "row" },
        style
      )}
    >
      <PlaybackTime
        seconds={currentSecond}
        style={{ color: Color["black-16"], width: 46 }}
      />
      <View style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <View
          style={{
            height: 2,
            marginHorizontal: 4,
            marginBottom: -19,
          }}
        >
          <View
            style={{
              height: 2,
              width: bufferedWidth,
              backgroundColor: "#fff",
            }}
          ></View>
        </View>
        <Slider
          value={currentSecond}
          onValueChange={onChange}
          minimumValue={0}
          maximumValue={totalSeconds || 1} // @react-native-community/slider crashes when min = 0 & max = 0
          disabled={!totalSeconds}
          thumbTintColor={Color["black-64"]}
          minimumTrackTintColor={Color["black-64"]}
          maximumTrackTintColor={Color["black-16"]}
          style={{ paddingHorizontal: 8, flexGrow: 1 }}
        />
      </View>
      <PlaybackTime
        seconds={totalSeconds}
        style={{ color: Color["black-16"], width: 46, textAlign: "right" }}
      />
    </View>
  );
};

export default SeekProgressBar;
