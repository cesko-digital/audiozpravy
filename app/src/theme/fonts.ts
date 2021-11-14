/**
 * This file contains all application's style relative to fonts
 */
 import { StyleSheet } from 'react-native'
 import { useTheme, Theme } from '@react-navigation/native';

 enum FontSize {
    'small' = 14,
    'regular' = 16,
    'large' = 24,
}

 export default function(theme : Theme): any {
   return StyleSheet.create({
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
    titleSmall: {
      fontSize: FontSize.small,
      fontFamily: 'RobotoBold',
      fontWeight: '700',
      color: theme.colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular,
      fontFamily: 'RobotoBold',
      fontWeight: '700',
      color: theme.colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large,
      fontWeight: '700',
      fontFamily: 'RobotoBold',
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