import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Player from "../../components/player";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";
import Color from "../../theme/colors";
import AppStatusBar from "../../components/statusBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { usePlayer } from "../../trackPlayerContext";

import Item from "./list-item";
import IncompleteItem from "./incomplete-item";
import { Article } from "../../shared/article";

const QueueScreen = ({ navigation }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const { state, progress, playArticle, playPause, setPlayed } = usePlayer();
  const [groupedData, setGrouped] = useState([]);

  useEffect(() => {
    var played = { key: 0, title: "Pokračujte v poslechu", data: [] };
    var queued = { key: 1, title: "Ve frontě", data: [] };

    state.queue.forEach((article) => {
      // ignore already played articles
      if (!article.played) {
        if (article.lastPosition != undefined && article.lastPosition > 0) {
          played.data.push(article);
        } else {
          queued.data.push(article);
        }
      }
    });

    var sections = [];
    if (played.data.length > 0) {
      sections.push(played);
    }
    if (queued.data.length > 0) {
      sections.push(queued);
    }
    setGrouped(sections);
  }, [state]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundNegative,
    },
    header: {
      ...(fonts.textSmall as Object),
      color: Color["black-8"],
      fontWeight: "800",
      paddingStart: 16,
      paddingTop: 8,
      paddingBottom: 4,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.separatorInverted,
      marginStart: 16,
      marginEnd: 16,
    },
  });

  const onIconPress = (item: Article, index: number) => {
    if (state.currentTrack?.id == item.id) {
      playPause();
    } else {
      playArticle(item.id);
    }
  };

  const onPress = (article: Article) => {
    playArticle(article.id);
  };

  const onIconClearPress = (article: Article) => {
    console.log("onIconClearPress");
    setPlayed(article);
  };

  const emptyView = () => (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        size={48}
        name="volume-mute-outline"
        style={{}}
        color={theme.colors.textLight}
      />
      <Text
        style={StyleSheet.compose(fonts.textReguar, {
          color: theme.colors.textLight,
        })}
      >
        Ve frontě nic není :(
      </Text>
    </View>
  );

  const renderItem = ({ item, index, section }) => {
    const isCurrent = () => {
      return item.id == state.currentTrack?.id;
    };

    if (section.key == 0) {
      return (
        <IncompleteItem
          item={item}
          progress={
            item.id == state.currentTrack?.id && state.isPlaying
              ? progress
              : null
          }
          isPlaying={isCurrent() && state.isPlaying}
          onPress={() => onPress(item)}
          onIconPress={() => {
            onIconPress(item, index);
          }}
          onClearIconPress={() => onIconClearPress(item)}
        />
      );
    } else {
      return (
        <Item
          item={item}
          isSelected={item.id == state.currentTrack?.id}
          isPlaying={item.id == state.currentTrack?.id && state.isPlaying}
          onPress={() => onPress(item)}
          onIconPress={() => {
            onIconPress(item, index);
          }}
        />
      );
    }
  };

  const renderSeparator = ({ highlighted, section }) => {
    if (section.key == 0) {
      return <View />;
    }
    return <View style={styles.separator}></View>;
  };

  return (
    <View style={styles.container}>
      <AppStatusBar
        barStyle="light-content"
        backgroundColor={Color["black-88"]}
      />
      <SectionList
        sections={groupedData}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => {
          return String(item.id);
        }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={renderItem}
        contentContainerStyle={[
          { flexGrow: 1 },
          groupedData.length ? null : { justifyContent: "center" },
        ]}
        ListEmptyComponent={emptyView}
        stickySectionHeadersEnabled={false}
      ></SectionList>
      <Player></Player>
    </View>
  );
};

export default QueueScreen;
