/**
 * This file contains all application's style relative to fonts
 */
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useTheme, Theme } from '@react-navigation/native';
import { useFonts as expoUseFonts } from "expo-font"

enum FontSize {
  'xsmall' = 12,
  'small' = 14,
  'regular' = 16,
  'large' = 24,
}

export interface FontsTheme {
  [key: string]: StyleProp<TextStyle>;
}

export function loadFonts() {
  return expoUseFonts({
    MondaBold: require("../../assets/fonts/Monda-Bold.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
  })
}

export default function useFonts(): FontsTheme {
  const theme = useTheme()
  return StyleSheet.create({
    textLightSmall: {
      fontFamily: 'RobotoLight',
      fontSize: FontSize.small,
      color: theme.colors.text,
    },
    textXSmall: {
      fontSize: FontSize.xsmall,
      color: theme.colors.text,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: theme.colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: theme.colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: theme.colors.text,
    },
    titleXSmall: {
      fontSize: FontSize.xsmall,
      fontWeight: '700',
      color: theme.colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small,
      //fontFamily: 'RobotoBold',
      fontWeight: '700',
      color: theme.colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular,
      //fontFamily: 'RobotoBold',
      fontWeight: '700',
      color: theme.colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large,
      fontWeight: '700',
      //fontFamily: 'RobotoBold',
      color: theme.colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}