import React, { FC, useState } from "react";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Color from "../../shared/colors";
import { Record } from "../../shared/types";
import Description from "../typography/description";
import Queue from "./queue";
import Progress from "./progress";
import PlaybackControls from "./playback-controls";

interface Props extends ViewProps {
  queue: Record[];
  hideQueue?: boolean;
  hideDescription?: boolean;
}

const emptyQueueRecord: Record = { description: "-", duration: 0 };

const Player: FC<Props> = ({ style, queue, hideQueue, hideDescription }) => {
  const recordsCount = queue.length;
  const [currentRecordIndex, setCurrentRecordIndex] = useState(
    recordsCount ? 0 : -1
  );
  const record = useMemo(
    () => queue[currentRecordIndex] || emptyQueueRecord,
    [currentRecordIndex, queue]
  );

  const [currentTime, setCurrentTime] = useState(0);

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
          {record.description}
        </Description>
      )}
      <Progress
        currentSecond={currentTime}
        totalSeconds={record.duration}
        onChange={(handlePos) => {
          setCurrentTime(Math.floor(handlePos));
        }}
        style={{ marginTop: 16 }}
      />
      <PlaybackControls
        onRewind={() => {
          setCurrentTime(Math.max(currentTime - 10, 0));
        }}
        onPlayPause={() => {}}
        onNext={() => {
          setCurrentRecordIndex((index) => {
            const nextIndex = index < recordsCount - 1 ? index + 1 : index;

            return nextIndex;
          });
          setCurrentTime(0);
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Player;
