import React, { FC } from "react";
import { useState } from "react";
import { View, Dimensions, Text, StyleSheet, ViewProps } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import NewsNavList from "./list";
import { useTheme } from "../../theme";
import useFonts from "../../theme/fonts";
import { useMemo } from "react";
import ScreenVariant from "./screenVariant";

const renderTabBar = (props: any) => {
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
            borderTopWidth: focused ? 2 : undefined,
            borderTopColor: focused ? theme.colors.text : undefined,
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

const todayDayNumber = (): number => {
  return new Date().getDay();
};

const getRoutes = (dayNumber: number) => {
  return [
    { key: ScreenVariant.today, title: "Dnes" },
    {
      key: ScreenVariant.week,
      title: dayNumber == 0 ? "Minulý týden" : "Tento týden",
    },
  ];
};

const TabViewNews: FC<ViewProps> = ({ style }) => {
  const [index, setIndex] = useState(0);
  const routes = useMemo(() => {
    return getRoutes(todayDayNumber());
  }, [todayDayNumber]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={StyleSheet.compose({ flex: 1 }, style)}
    />
  );
};

export default TabViewNews;
