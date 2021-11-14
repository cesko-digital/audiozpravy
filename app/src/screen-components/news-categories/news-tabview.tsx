import * as React from "react";
import { useState } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import NewsNavList from "./news-list";
import Fonts from "../../theme/fonts";
import { useTheme } from "../../theme";

const renderTabBar = (props) => {
  const theme = useTheme();
  const fonts = Fonts(theme);

  return (
    <TabBar
      scrollEnabled={true}
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.background }}
      style={{
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.background,
      }}
      tabStyle={{ width: "auto" }}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            borderTopWidth: focused ? 2 : null,
            borderTopColor: focused ? theme.colors.text : null,
          }}
        >
          <Text
            style={StyleSheet.compose(fonts.titleRegular, {
              color: focused ? theme.colors.text : theme.colors.textSemiLight,
              marginRight: 4,
              paddingTop: 5,
            })}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );
};

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  today: () => <NewsNavList topic="Dnes" />,
  thisWeek: () => <NewsNavList topic="Tento týden" />,
});

export default function TabViewNews() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Dnes" },
    { key: "thisWeek", title: "Tento týden" }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{ flex: 1 }}
    />
  );
}
