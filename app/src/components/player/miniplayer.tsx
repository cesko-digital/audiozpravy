import React, { FC, useRef } from "react"
import { StyleSheet, View, ViewProps, TouchableOpacity, Text, Animated } from "react-native"

import Color from "../../theme/colors"
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event, State } from 'react-native-track-player'
import { usePlayer } from "../../trackPlayerContext"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../../theme"
import useFonts from "../../theme/fonts"
import { useMemo } from "react"
import { useEffect } from "react"


interface Props extends ViewProps {
    currentSecond: number
    totalSeconds: number
}

const ProgressView: FC<Props> = ({ currentSecond, totalSeconds }) => {
    const position = useRef(new Animated.Value(0)).current

    const width = position.interpolate({
        inputRange: [0, totalSeconds],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })
    Animated.timing(position, {
        toValue: currentSecond,
        duration: 10,
        useNativeDriver: false,
    }).start()

    return (<View style={{ height: 8, backgroundColor: Color["black-16"] }}>
        <Animated.View
            style={[StyleSheet.absoluteFill, { borderTopEndRadius: 4, borderBottomEndRadius: 4, backgroundColor: Color["black-64"], width }]}></Animated.View>
    </View>)
}

const MiniPlayer: FC<ViewProps> = ({ style }) => {
    const progress = useProgress()
    const { state, setState, setQueue } = usePlayer()
    const theme = useTheme()
    const fonts = useFonts()

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
            alignSelf: 'center',
            marginStart: 8,
            height: 40,
            width: 40,
        },
        description: {
            color: theme.colors.textInverse,
            flex: 1,
            marginEnd: 16
        },
        progress: {
            flexGrow: 1,
            backgroundColor: Color["black-16"]
        }
    })

    const onPlayPause = () => {
        if (state.isPlaying) {
            TrackPlayer.pause()
        } else {
            TrackPlayer.play()
        }
    }

    const onNext = () => {
        TrackPlayer.skipToNext()
    }

    return (
        <Animated.View style={[styles.player, style, { transform: [{ translateY: state.recordsCount > 0 ? 0 : 90 }] }]}>
            <View style={{ flexDirection: 'row', padding: 16 }}>

                <Text numberOfLines={3}
                    style={StyleSheet.compose(fonts.textLightSmall, styles.description)}>
                    {state?.currentTrack?.title}
                </Text>

                <TouchableOpacity
                    onPress={onPlayPause}
                    style={styles.buttonStyle}
                >
                    <MaterialCommunityIcons
                        name={state.isPlaying ? "pause" : "play"}
                        color={Color["black-100"]}
                        size={46}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onNext}
                    style={styles.smallButtonStyle}
                    disabled={state.currentIndex + 1 >= state.recordsCount}
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
    )
}

export default MiniPlayer