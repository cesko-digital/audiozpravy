import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, SectionList, FlatList, TouchableOpacity, Image } from "react-native";
import Player from "../../components/player";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import Color from "../../theme/colors";
import AppStatusBar from "../../components/statusBar"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer, { useTrackPlayerEvents, Event, State, Track } from 'react-native-track-player';
import { useIsFocused } from '@react-navigation/native';
import { initialPlayerState, createPlayerState } from "../../trackPlayer";
import { usePlayer } from "../../trackPlayerContext";

const Item = ({ item, isSelected, isPlaying, onPress, onIconPress }) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (<View style={{ alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 8,
        paddingTop: 16,
        backgroundColor: isSelected ? theme.colors.primary : "transparent"
      }}
    >
      <TouchableOpacity style={{ width: 56, height: 42 }} onPress={onIconPress}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10
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
            marginLeft: 12
          }}
        >
          <MaterialCommunityIcons name={isPlaying ? "pause" : "play"} color="white" size={24} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          marginStart: 16,
          marginEnd: 8
        }}
      >
        <View style={{}}>
          <Text
            style={StyleSheet.compose(fonts.titleSmall, { color: theme.colors.textInverse, lineHeight: 20 })}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 10,
              lineHeight: 16,
              color: Color["black-24"],
            }}
          >
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>)
};

const QueueScreen = ({ navigation }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const isFocused = useIsFocused();
  const [queue, setQueue] = useState([])
  const { state, setState } = usePlayer()

  useEffect(() => {
    TrackPlayer.getQueue().then(async (queue) => {
      setQueue(queue)
    })
  }, [isFocused])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundNegative
    },
    header: {
      ...fonts.textSmall as Object,
      color: Color["black-8"],
      paddingStart: 16,
      paddingTop: 8,
      paddingBottom: 4
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginStart: 16,
      marginEnd: 16
    }
  });

  const onIconPress = (item: Track, index: number) => {
    if (index == state.currentIndex) {
      if (state.isPlaying) {
        TrackPlayer.pause()
      } else {
        TrackPlayer.play()
      }
    } else {
      TrackPlayer.skip(index)
    }
  }

  const emptyView = () => (
    <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons size={48} name='volume-mute-outline' style={{}} color={theme.colors.textLight} />
      <Text style={StyleSheet.compose(fonts.textReguar, { color: theme.colors.textLight })}>Ve frontě nic nic není :(</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <AppStatusBar barStyle="light-content" backgroundColor={Color["black-88"]} />
      <FlatList
        data={queue}
        extraData={state.currentIndex}
        ItemSeparatorComponent={
          ({ highlighted }) => (
            <View style={styles.separator}></View>
          )
        }
        keyExtractor={(item, index) => String(item.id)}

        renderItem={({ item, index }) => <Item
          item={item}
          isSelected={index == state.currentIndex}
          isPlaying={index == state.currentIndex && state.isPlaying}
          onPress={() => TrackPlayer.skip(index)}
          onIconPress={() => { onIconPress(item, index) }}
        />}

        contentContainerStyle={[{ flexGrow: 1 }, queue.length ? null : { justifyContent: 'center' }]}
        ListEmptyComponent={emptyView}
      />

      <Player
        style={{}}
        hideDescription
        hideQueue
      ></Player>
    </View>
  );
};

export default QueueScreen

