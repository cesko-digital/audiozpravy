import React, { FC } from "react"
import { Text, View, StyleSheet, ViewProps } from "react-native"
import useFonts from "../theme/fonts"
import { useTheme } from '@react-navigation/native'
import AppStatusBar from "../components/statusBar"
import MiniPlayer from "../components/player/miniplayer"
import { AppDarkTheme } from "../theme"
import { usePlayer } from "../trackPlayerContext"


interface ScreenProps extends ViewProps {
    title: string
}

const ScreenWithMiniplayer: FC<ScreenProps> = ({ style, children, title }) => {
    const theme = useTheme()
    const fonts = useFonts()
    const { state } = usePlayer()

    return (
        <View style={{ flex: 1 }} >
            <AppStatusBar barStyle={theme == AppDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
            <View
                style={{
                    paddingStart: 16,
                    paddingTop: 24,
                    paddingBottom: 8
                }}
            >
                <Text style={StyleSheet.compose(fonts.titleLarge, { color: theme.colors.text })}>
                    {title}
                </Text>
            </View>
            {children}
            <MiniPlayer style={{ position: 'absolute', bottom: 0 }}></MiniPlayer>
        </View>
    )
}

export default ScreenWithMiniplayer