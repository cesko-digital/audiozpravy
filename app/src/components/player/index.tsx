import React, { FC, useState, useContext, useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Color from "../../theme/colors";
import Description from "../typography/description";
import Queue from "./queue";
import Progress from "./progress";
import PlaybackControls from "./playback-controls";
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import { initialPlayerState, createPlayerState } from "../../trackPlayer";
import { useIsFocused } from '@react-navigation/native';
import PlayerContextProvider, { PlayerContext, usePlayer } from "../../trackPlayerContext";

interface Props extends ViewProps {
  hideQueue?: boolean;
  hideDescription?: boolean;
}

const Player: FC<Props> = ({ style, hideQueue, hideDescription }) => {
  const progress = useProgress()
  const { state, setState, setQueue } = usePlayer()

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
      {hideQueue ? null : (
        <Queue size={state.recordsCount}
          currentIndexZeroBased={state.currentIndex} />
      )}
      {hideDescription ? null : (
        <Description
          style={{ color: "white", marginTop: 16 }}
          numberOfLines={2}
        >
          {state?.currentTrack?.title}
        </Description>
      )}
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
            TrackPlayer.pause()
          } else {
            TrackPlayer.play()
          }
        }}
        onNext={() => {
          TrackPlayer.skipToNext()
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}

export default Player
