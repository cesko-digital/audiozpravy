import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TabViewNews from "./news-tabview";
import useFonts from "../../theme/fonts";
import { useTheme } from '@react-navigation/native';
import AppStatusBar from "../../components/statusBar"
import Player from "../../components/player";
import { AppDarkTheme } from "../../theme"

const NewsScreen = ({ navigation }) => {
  const theme = useTheme()
  const fonts = useFonts()

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
          Nejnovější zprávy
        </Text>
      </View>
      <TabViewNews />
      <Player
        style={{}}
      ></Player>
    </View>
  );
};

export default NewsScreen;
