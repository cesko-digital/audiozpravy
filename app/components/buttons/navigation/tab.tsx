import React from "react";
import { TouchableOpacity, Text } from "react-native";

import Color from "../../../shared/colors";

const Tab = ({ options, route, isFocused, navigation }) => {
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const color = isFocused ? Color.blue : Color["black-100"];

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: isFocused ? color : "transparent",
        marginHorizontal: 10,
      }}
    >
      {options.tabBarIcon({ color })}
      <Text style={{ color, fontSize: 10, fontFamily: "RobotoLight" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
