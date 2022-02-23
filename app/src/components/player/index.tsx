import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Color from "../../theme/colors";
import SeekProgressBar from "./seek-progress";
import PlaybackControls from "./playback-controls";
import { usePlayer } from "../../trackPlayerContext";

const Player: FC<ViewProps> = ({ style }) => {
  const { state, progress, seekTo, playPause, skipToNext } = usePlayer();

  return (
    <View
      style={StyleSheet.compose(
        {
          backgroundColor: Color["black-100"],
          padding: 16,
          width: "100%",
        },
        style
      )}
    >
      <SeekProgressBar
        currentSecond={progress.position}
        totalSeconds={progress.duration}
        onChange={(handlePos) => {
          seekTo(Math.floor(handlePos));
        }}
        style={{ marginTop: 16 }}
      />
      <PlaybackControls
        onRewind={() => {
          seekTo(Math.floor(Math.max(progress.position - 10, 0)));
        }}
        onPlayPause={() => {
          playPause();
        }}
        onNext={() => {
          skipToNext();
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Player;
