import React, { FC } from "react"
import { useState } from "react"
import { View, Dimensions, Text, StyleSheet, ViewProps } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import NewsNavList, { ScreenVariant } from "./news-list"
import { useTheme } from "../../theme"
import useFonts from "../../theme/fonts"

const renderTabBar = (props) => {
  const theme = useTheme();
  const fonts = useFonts();

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
  today: () => <NewsNavList variant={ScreenVariant.today} />,
  thisWeek: () => <NewsNavList variant={ScreenVariant.week} />,
});


const TabViewNews: FC<ViewProps> = ({ style }) => {
  const [index, setIndex] = useState(0);

  const getRoutes = () => {
    const dayNumber = new Date().getDay()
    return [
      { key: "today", title: "Dnes" },
      { key: "thisWeek", title: dayNumber == 0 ? 'Minulý týden' : 'Tento týden' }
    ]
  }

  const [routes, setRoutes] = useState(getRoutes());

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={StyleSheet.compose({ flex: 1 }, style)}
    />
  )
}

export default TabViewNews
