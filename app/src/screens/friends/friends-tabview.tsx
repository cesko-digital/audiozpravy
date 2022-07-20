import { NavigationState, ParamListBase } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
} from "react-native-tab-view";
import Color from "../../theme/colors";
import FriendsNavList from "./friends-list";

const renderTabBar = ({ props }: any) => {
  return (
    <TabBar
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
            borderTopWidth: focused ? 2 : undefined,
            borderTopColor: focused ? Color["black-100"] : undefined,
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
  selection: () => <FriendsNavList topic="Výběr" />,
  listening: () => <FriendsNavList topic="Co poslouchají" />,
  favourites: () => <FriendsNavList topic="Oblíbené kategorie" />,
});

export default function TabViewFriends() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "selection", title: "Výběr" },
    { key: "listening", title: "Co poslouchají" },
    { key: "favourites", title: "Oblíbené kategorie" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{
        flex: 1,
      }}
    />
  );
}
