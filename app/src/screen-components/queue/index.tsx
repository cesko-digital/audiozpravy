import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SectionList, FlatList, TouchableOpacity, Image } from "react-native";
import Player from "../../components/player";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import Color from "../../theme/colors";
import AppStatusBar from "../../components/statusBar"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import { useIsFocused } from '@react-navigation/native';

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
  const [currentIndex, setCurrIndex] = useState(-1)
  const [isPlaying, setIsPalying] = useState(false)

  // async function groupedQueue() {
  //   console.warn('groupedQueue')
  //   const queue = await TrackPlayer.getQueue()
  //   const playingIndex = await TrackPlayer.getCurrentTrack()
  //   const notPlaying = queue.filter((item, index) => index != playingIndex)
  //   const data = DATA
  //   if (playingIndex != null) {
  //     const track = queue[playingIndex]
  //     data[1].data = [track]
  //   }
  //   data[2].data = notPlaying
  //   return data
  // }


  useEffect(() => {
    TrackPlayer.getQueue().then(async (queue) => {
      setQueue(queue)
    })
  }, [isFocused])

  useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackTrackChanged, Event.PlaybackError], async (event) => {
    const queue = await TrackPlayer.getQueue()
    const playingIndex = await TrackPlayer.getCurrentTrack()
    const state = await TrackPlayer.getState()
    setIsPalying(state == State.Playing)
    setCurrIndex(playingIndex)
    setQueue(queue)
    if (event.type == Event.PlaybackTrackChanged) {
      const prevTrack = event.track
      if (prevTrack != null) {
        const prevTrackPosition = event.position
        console.info("Previous track position = " + prevTrackPosition)
      }
      const nextTrack = event.nextTrack
    }
  })

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
      backgroundColor: theme.colors.background,
      marginStart: 16,
      marginEnd: 16
    }
  });

  return (
    <View style={styles.container}>
      <AppStatusBar barStyle="light-content" backgroundColor={Color["black-88"]} />
      <FlatList
        data={queue}
        extraData={currentIndex}
        ItemSeparatorComponent={
          ({ highlighted }) => (
            <View style={styles.separator}></View>
          )
        }
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item, index }) => <Item
          item={item}
          isSelected={index == currentIndex}
          isPlaying={index == currentIndex && isPlaying}
          onPress={() => TrackPlayer.skip(index)}
          onIconPress={() => {
            if (index == currentIndex) {
              if (isPlaying) {
                TrackPlayer.pause()
              } else {
                TrackPlayer.play()
              }
            } else {
              TrackPlayer.skip(index)
            }
          }}
        />}
      />

      <Player
        queue={[]}
        style={{ position: "absolute", bottom: 0 }}
        hideDescription
        hideQueue
      ></Player>
    </View>
  );
};

export default QueueScreen

