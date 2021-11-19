import React, { FC } from "react";
import { useMemo } from "react";
import { Text, TextProps } from "react-native";

interface Props {
  seconds: number;
}

const PlaybackTime: FC<Props & TextProps> = ({
  seconds: durationInSeconds,
  ...rest
}) => {
  const [formatedMinutes, formatedSeconds] = useMemo(() => {
    const [minutes, seconds] = getMinutesWithSeconds(durationInSeconds);

    return [`${minutes}`, formatToTwoDecimals(seconds)];
  }, [durationInSeconds]);

  return (
    <Text {...rest}>
      {formatedMinutes}:{formatedSeconds}
    </Text>
  );
};

export default PlaybackTime;

function getMinutesWithSeconds(durationInSeconds: number) {
  const seconds = durationInSeconds % 60;
  const minutes = (durationInSeconds - seconds) / 60;
  return [minutes, seconds];
}

function formatToTwoDecimals(number: number) {
  const _number = Math.round(number)
  return _number < 10 ? `0${_number}` : `${_number}`;
}
