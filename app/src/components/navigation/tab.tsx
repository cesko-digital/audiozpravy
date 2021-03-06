import React, { FC } from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, Route, ViewProps } from "react-native";
import { useColorScheme } from "react-native";
import { AppLightTheme, AppDarkTheme } from "../../theme";

interface Props extends ViewProps {
  options: BottomTabNavigationOptions;
  route: Route;
  isFocused: boolean;
  navigation: any;
}

const Tab: FC<Props> = ({ options, route, isFocused, navigation }) => {
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const scheme = useColorScheme();
  const tintColor =
    scheme === "dark" ? AppDarkTheme.colors.text : AppLightTheme.colors.primary;
  const defaultColor =
    scheme === "dark"
      ? AppDarkTheme.colors.textLight
      : AppLightTheme.colors.text;
  const color: string = isFocused ? tintColor : defaultColor;

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
      {options.tabBarIcon
        ? options.tabBarIcon({ color, focused: isFocused, size: 24 })
        : null}
      <Text style={{ color, fontSize: 10, fontFamily: "RobotoLight" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
