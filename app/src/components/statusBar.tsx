import React, { useCallback } from 'react';
import { View, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';


const useStatusBar = (style, animated = true) => {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(style, animated);
        }, [])
    );
};

export interface AppStatusBarProps {
    backgroundColor: string
    barStyle: StatusBarStyle
}
const AppStatusBar = ({ backgroundColor, barStyle = "dark-content" }: AppStatusBarProps) => {

    const insets = useSafeAreaInsets();
    useStatusBar(barStyle)

    return (
        <View style={{ height: insets.top, backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                barStyle={barStyle} />
        </View>
    );
};
export default AppStatusBar