import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TopicsScreen from "./screen-components/topics";
import { Screens } from "./screens";
import OnboardingScreen from "./screen-components/onboarding";
import NewsScreen from "./screen-components/news";
import FriendsScreen from "./screen-components/friends";
import QueueScreen from "./screen-components/queue";
import CategoriesScreen from "./screen-components/categories";
import SettingsScreen from "./screen-components/settings";
import Bar from "./components/buttons/navigation/bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    MondaBold: require("./assets/fonts/Monda-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Screens.onboarding}
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screens.topics}
            component={TopicsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screens.home}
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={Bar}>
      <Tab.Screen
        name={Screens.news}
        component={NewsScreen}
        options={{
          title: "Domů",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.friends}
        component={FriendsScreen}
        options={{
          title: "Přátelé",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.queue}
        component={QueueScreen}
        options={{
          title: "Fronta",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.categories}
        component={CategoriesScreen}
        options={{
          title: "Kategorie",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.settings}
        component={SettingsScreen}
        options={{
          title: "Nastavení",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
