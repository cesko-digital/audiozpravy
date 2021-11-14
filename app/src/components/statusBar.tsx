import React, { useCallback } from 'react';
import { View, StatusBar } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const useStatusBar = (style, animated = true) => {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(style, animated);
        }, [])
    );
};

const AppStatusBar = ({
    backgroundColor,
    barStyle = "dark-content",
}
) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ height: insets.top, backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                barStyle={barStyle} />
        </View>
    );
};
export { AppStatusBar, SafeAreaProvider, useStatusBar }