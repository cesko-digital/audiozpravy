import React, { memo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Tab from "./tab";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps, BottomTabBarOptions } from "@react-navigation/bottom-tabs";

const Bar = ({ style, state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const barHiddenForCurrentTab = focusedOptions.tabBarVisible === false;
  const insets = useSafeAreaInsets();
  const tabBarStyle = style as StyleProp<ViewStyle>

  if (barHiddenForCurrentTab) {
    return null;
  }

  return (
    <View>
      <View
        style={StyleSheet.compose({
          flexDirection: "row",
          height: 56,
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          justifyContent: "space-between",
        }, tabBarStyle)}
      >
        {state.routes.map((route, index) => (
          <Tab
            route={route}
            options={descriptors[route.key].options}
            navigation={navigation}
            isFocused={state.index === index}
            key={route.name}
          />
        ))}
      </View>
      <View style={StyleSheet.compose({ height: insets.bottom }, tabBarStyle)}></View>
    </View>
  );
};

export default memo(Bar);