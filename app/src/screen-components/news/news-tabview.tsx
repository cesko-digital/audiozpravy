import * as React from "react";
import { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Color from "../../theme/colors";
import NewsNavList from "./news-list";

const renderTabBar = (props) => {
  return (
    <TabBar

    scrollEnabled={true}
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{
        backgroundColor: "white",
        shadowColor: "white",
      }}
      tabStyle={{ width: "auto" }}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            borderTopWidth: focused ? 2 : null,
            borderTopColor: focused ? Color["black-100"] : null,
          }}
        >
          <Text
            style={{
              color: focused ? Color["black-100"] : Color["black-64"],
              fontFamily: "RobotoBold",
              fontSize: 16,
              marginRight: 4,
              paddingTop: 5,
            }}
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
  selection: () => <NewsNavList topic="Výběr" />,
  economics: () => <NewsNavList topic="Ekonomika" />,
  sport: () => <NewsNavList topic="Sport" />,
  covid: () => <NewsNavList topic="Kornavirus" />,
  foreign: () => <NewsNavList topic="Zahraničí" />,
  culture: () => <NewsNavList topic="Kultura" />,
});

export default function TabViewNews() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "selection", title: "Výběr" },
    { key: "economics", title: "Ekonomika" },
    { key: "sport", title: "Sport" },
    { key: "covid", title: "Koronavirus" },
    { key: "foreign", title: "Zahraničí" },
    { key: "culture", title: "Kultura" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{
        flex: 1 
      }}
    />
  );
}
