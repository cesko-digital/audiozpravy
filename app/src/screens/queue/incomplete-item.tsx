import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { cs } from "date-fns/locale";

import ItemBase from "./item-base";
import { Article } from "@app/shared/article";
import { TrackProgress } from "@app/providers/PlayerContextProvider";

type Props = {
  item: Article;
  progress: TrackProgress | null;
  isPlaying: boolean;
  onPress: () => void;
  onIconPress: () => void;
  onClearIconPress: () => void;
};

const IncompleteItem = ({
  item,
  progress,
  isPlaying,
  onPress,
  onIconPress,
  onClearIconPress,
}: Props) => {
  const theme = useTheme();
  const fonts = useFonts();
  const [progressWidth, setProgressWidth] = useState(0);

  var formatted = "-";
  if (item.publishedAt) {
    if (typeof item.publishedAt === "string") {
      item.publishedAt = parseISO(item.publishedAt);
    }
    formatted = format(item.publishedAt, "do MMMM, HH:mm", { locale: cs });
  }

  useEffect(() => {
    const lastPosition = item.lastPosition ?? 0;
    const duration = item.duration ?? 1;
    setProgressWidth((lastPosition / duration) * 100);
  }, []);

  useEffect(() => {
    if (progress != null) {
      const lastPosition = Math.max(progress.position, item.lastPosition ?? 0);
      const duration = progress.duration;
      setProgressWidth((lastPosition / duration) * 100);
    }
  }, [progress]);

  const styles = StyleSheet.create({
    container: {
      paddingStart: 8,
      paddingEnd: 8,
      paddingBottom: 8,
      paddingTop: 8,
    },
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.cardInverted,
      borderRadius: 12,
      padding: 8,
    },
    progressBack: {
      backgroundColor: theme.colors.textSemiLight,
      height: 2,
      borderRadius: 4,
      marginTop: 2,
    },
    progressBar: {
      backgroundColor: theme.colors.primary,
      height: 2,
      borderRadius: 4,
      width: String(progressWidth) + "%",
    },
  });

  return (
    <View style={{}}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            style={{ width: 56, height: 42 }}
            onPress={onIconPress}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              source={{
                uri: item.img,
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 30,
                width: 30,
                marginTop: -36,
                marginLeft: 12,
              }}
            >
              <MaterialCommunityIcons
                name={isPlaying ? "pause" : "play"}
                color="white"
                size={24}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPress}
            style={{
              flex: 1,
              marginStart: 16,
              marginEnd: 8,
            }}
          >
            <ItemBase
              firstLine={item.title}
              secondLine={`${formatted} ???  ${item.artist}`}
            />
            {/* <View style={{}}>
              <Text
                style={StyleSheet.compose(fonts.titleXSmall, {
                  color: theme.colors.textInverse,
                  lineHeight: 20,
                })}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={StyleSheet.compose(fonts.textXSmall, {
                  color: theme.colors.textLight,
                })}
              >
                {formatted} ??? {item.artist}
              </Text>
            </View> */}

            <View style={styles.progressBack}>
              <View
                style={[StyleSheet.absoluteFill, styles.progressBar]}
              ></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 42,
              height: 42,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
            onPress={onClearIconPress}
          >
            <MaterialCommunityIcons
              name="check"
              color="white"
              size={24}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IncompleteItem;
