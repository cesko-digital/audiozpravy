import {
  DefaultTheme,
  DarkTheme,
  useTheme as useThemeOriginal,
} from "@react-navigation/native";
import Color from "./colors";

export type AppTheme = {
  dark: boolean;
  colors: {
    primary: string;
    primaryLight: string;
    background: string;
    backgroundNegative: string;
    card: string;
    cardInverted: string;
    text: string;
    border: string;
    notification: string;
    textLight: string;
    textSemiLight: string;
    textInverse: string;
    skeletonLight: string;
    separator: string;
    separatorInverted: string;
    primaryButton: string;
    primaryButtonDisabled: string;
    primaryButtonLabel: string;
  };
};

export const AppLightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    backgroundNegative: Color["black-88"],
    primary: "#1745C0",
    primaryLight: "#1745C014",
    textLight: "#868588",
    textSemiLight: "#565459",
    textInverse: "#FFFFFF",
    skeletonLight: "#c2c2c3",
    separator: "#DBDBDBAA",
    separatorInverted: "#DBDBDB20",
    primaryButton: Color["black-100"],
    primaryButtonDisabled: Color["black-64"],
    primaryButtonLabel: Color.white,
    cardInverted: "#2A2A2A",
  },
};

export const AppDarkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    backgroundNegative: Color["black-88"],
    primary: "#1745C0",
    primaryLight: "#1745C014",
    textLight: "#868588",
    textSemiLight: "#565459",
    textInverse: "#FFFFFF",
    skeletonLight: "#DBDBDB",
    separator: "#DBDADB20",
    separatorInverted: "#DBDADB20",
    primaryButton: Color["black-88"],
    primaryButtonDisabled: Color["black-64"],
    primaryButtonLabel: Color.white,
    cardInverted: "#2A2A2A",
  },
};

export function useTheme(): AppTheme {
  return useThemeOriginal() as AppTheme;
}
