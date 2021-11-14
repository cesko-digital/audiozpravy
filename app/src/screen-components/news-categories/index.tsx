import React from "react";
import { Text, View, StatusBar } from "react-native";
import TabViewNews from "./news-tabview";
import Fonts from "../../theme/fonts";
import { useTheme } from '@react-navigation/native';
import { AppStatusBar, useStatusBar } from "../../components/statusBar"

const NewsScreen = ({ navigation }) => {
  const theme = useTheme();
  const fonts = Fonts(theme);
  useStatusBar('dark-content')

  return (
    <View style={{ flex: 1 }} >
      <AppStatusBar barStyle="dark-content" backgroundColor={theme.colors.background}/>
      <View
        style={{
          paddingStart: 16,
          paddingTop: 24,
          paddingBottom: 8
        }}
      >
        <Text style={[fonts.titleLarge, { color: theme.colors.text }]}>
          Nejnovější zprávy
        </Text>
      </View>
      <TabViewNews />
    </View>
  );
};

export default NewsScreen;
