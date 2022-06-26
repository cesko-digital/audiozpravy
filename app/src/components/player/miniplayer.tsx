import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

import Color from "../../theme/colors";
import { usePlayer } from "../../providers/PlayerContextProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import useFonts from "../../theme/fonts";
import { ProgressView } from "./progressView";

const styles = StyleSheet.create({
  player: {
    backgroundColor: Color["black-100"],
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
  },
  smallButtonStyle: {
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginStart: 8,
    height: 40,
    width: 40,
  },
  description: {
    flex: 1,
    marginEnd: 16,
  },
  progress: {
    flexGrow: 1,
    backgroundColor: Color["black-16"],
  },
});

const MiniPlayer: FC<ViewProps> = ({ style }) => {
  const { state, progress, skipToNext, playPause } = usePlayer();
  const theme = useTheme();
  const fonts = useFonts();
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    if (state.currentTrack != null) {
      const actualArticleIndex = state.queue.indexOf(state.currentTrack);
      const _hasNext = actualArticleIndex < state.queue.length - 1;
      setHasNext(_hasNext);
    }
  }, [state]);

  const onPlayPause = () => {
    playPause();
  };

  const onNext = () => {
    skipToNext();
  };

  const descriptionStyle = StyleSheet.compose(fonts.textLightSmall, {
    color: theme.colors.textInverse,
  });

  return (
    <Animated.View
      style={[
        styles.player,
        style,
        { transform: [{ translateY: state.queue.length > 0 ? 0 : 90 }] },
      ]}
    >
      <View style={{ flexDirection: "row", padding: 16 }}>
        <Text
          numberOfLines={3}
          style={StyleSheet.compose(descriptionStyle, styles.description)}
        >
          {state?.currentTrack?.title}
        </Text>

        <TouchableOpacity onPress={onPlayPause} style={styles.buttonStyle}>
          <MaterialCommunityIcons
            name={state.isPlaying ? "pause" : "play"}
            color={Color["black-100"]}
            size={46}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          style={styles.smallButtonStyle}
          disabled={!hasNext}
        >
          <MaterialCommunityIcons
            name="skip-next"
            color={Color["black-100"]}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <ProgressView
        currentSecond={progress.position}
        totalSeconds={progress.duration}
        style={{ marginTop: 16 }}
      />
    </Animated.View>
  );
};

export default MiniPlayer;
