import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  RefreshControl,
  ViewProps,
} from "react-native";
import Color from "../../../theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePlayer } from "../../../providers/PlayerContextProvider";
import useFonts from "../../../theme/fonts";
import { useTheme } from "../../../theme";
import { Article } from "../../../shared/article";
import { subDays, subHours, format, parseJSON } from "date-fns";
import { cs } from "date-fns/locale";
import PlusIcon from "../../../components/PlusIcon";

interface Props {
  item: Article;
  onPress: (item: Article) => void;
  onPlusPress: (item: Article) => void;
}

const ListItem: FC<Props> = ({ item, onPress, onPlusPress }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const { state } = usePlayer();

  const [inQueue, setInQueue] = useState(false);

  useEffect(() => {
    const filtered = state.queue.filter((value, index, array) => {
      return value.id == item.id;
    });
    setInQueue(filtered.length > 0);
  }, [state]);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingStart: 16,
          paddingEnd: 16,
          paddingBottom: 14,
          paddingTop: 14,
        }}
      >
        <View style={{ width: 68, height: 50 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              backgroundColor: "gray",
            }}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            onPress(item);
          }}
          style={{
            flex: 1,
            marginStart: 16,
            marginEnd: 8,
          }}
        >
          <View style={{}}>
            <Text style={fonts.titleSmall} numberOfLines={2}>
              {item.title}
            </Text>
            <Text
              style={StyleSheet.compose(fonts.textXSmall, {
                color: theme.colors.textLight,
              })}
            >
              {format(item.publishedAt, "do MMMM, HH:mm", { locale: cs })} ‧{" "}
              {item.artist}
            </Text>
          </View>
        </TouchableOpacity>
        <PlusIcon
          onPress={() => {
            onPlusPress(item);
          }}
          selected={inQueue}
        />
      </View>
    </View>
  );
};

export default ListItem;
