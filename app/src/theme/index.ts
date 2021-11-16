import { DefaultTheme, DarkTheme, useTheme as useThemeOriginal } from "@react-navigation/native";
import Color from "./colors";


export type AppTheme = {
    dark: boolean;
    colors: {
        primary: string;
        primaryLight: string;
        background: string;
        backgroundNegative: string;
        card: string;
        text: string;
        border: string;
        notification: string;
        textLight: string;
        textSemiLight: string;
        textInverse: string;
    };
};

export const AppLightTheme: AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
        backgroundNegative: Color["black-88"],
        primary: '#1745C0',
        primaryLight: '#1745C014',
        textLight: '#868588',
        textSemiLight: '#565459',
        textInverse: '#FFFFFF'
    },
};

export const AppDarkTheme: AppTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        backgroundNegative: Color["black-88"],
        primary: '#1745C0',
        primaryLight: '#1745C014',
        textLight: '#868588',
        textSemiLight: '#565459',
        textInverse: '#FFFFFF'
    },
};

export function useTheme(): AppTheme {
    return useThemeOriginal() as AppTheme
}