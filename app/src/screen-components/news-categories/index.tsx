import React from "react";
import { Text, View, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";
import TabViewNews from "./news-tabview";
import useFonts from "../../theme/fonts";
import { useTheme } from '@react-navigation/native';
import AppStatusBar from "../../components/statusBar"

const NewsScreen = ({ navigation }) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (
    <View style={{ flex: 1 }} >
      <AppStatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
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
    </View>
  );
};

export default NewsScreen;
