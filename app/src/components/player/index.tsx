import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Color from "../../theme/colors";
import Progress from "./progress";
import PlaybackControls from "./playback-controls";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { usePlayer } from "../../trackPlayerContext";

const Player: FC<ViewProps> = ({ style }) => {
  const progress = useProgress();
  const { state, setState, setQueue } = usePlayer();

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
      <Progress
        currentSecond={progress.position}
        totalSeconds={progress.duration}
        onChange={(handlePos) => {
          TrackPlayer.seekTo(Math.floor(handlePos));
        }}
        style={{ marginTop: 16 }}
      />
      <PlaybackControls
        onRewind={() => {
          TrackPlayer.seekTo(Math.floor(Math.max(progress.position - 10, 0)));
        }}
        onPlayPause={() => {
          if (state.isPlaying) {
            TrackPlayer.pause();
          } else {
            TrackPlayer.play();
          }
        }}
        onNext={() => {
          TrackPlayer.skipToNext();
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Player;
