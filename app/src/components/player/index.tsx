import React, { FC, useState, useEffect } from "react";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Color from "../../theme/colors";
import { Record } from "../../shared/types";
import Description from "../typography/description";
import Queue from "./queue";
import Progress from "./progress";
import PlaybackControls from "./playback-controls";
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event, State } from 'react-native-track-player';

interface Props extends ViewProps {
  queue: Record[];
  hideQueue?: boolean;
  hideDescription?: boolean;
}

const Player: FC<Props> = ({ style, hideQueue, hideDescription }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);
  const [recordsCount, setRecordsCount] = useState(0);
  const progress = useProgress();
  const [isPlaying, setPlaying] = useState(false);

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    const queue = await TrackPlayer.getQueue()
    const currentIndex = await TrackPlayer.getPosition()
    const state = await TrackPlayer.getState();
    setRecordsCount(queue.length)
    setCurrentRecordIndex(currentIndex)
    setCurrentTrack(TrackPlayer.getTrack(currentIndex))
    setPlaying(state == State.Playing)
  });

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
        <Queue size={recordsCount} currentIndexZeroBased={currentRecordIndex} />
      )}
      {hideDescription ? null : (
        <Description
          style={{ color: "white", marginTop: 16 }}
          numberOfLines={2}
        >
          {currentTrack.title}
        </Description>
      )}
      <Progress
        currentSecond={progress.position}
        totalSeconds={progress.duration / 1}
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
          if (isPlaying) {
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
  );
};

export default Player;
