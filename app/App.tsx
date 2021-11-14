import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TopicsScreen from "./src/screen-components/topics";
import { Screens } from "./src/screens";
import OnboardingScreen from "./src/screen-components/onboarding";
import NewsScreen from "./src/screen-components/news-categories";
import NewsListScreen from "./src/screen-components/news";
import UserNewsScreen from "./src/screen-components/user-news"
import QueueScreen from "./src/screen-components/queue";
import Bar from "./src/components/navigation/bar";
import { useColorScheme, View } from 'react-native';
import { AppDarkTheme, AppLightTheme } from './src/theme'
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    MondaBold: require("./assets/fonts/Monda-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? AppDarkTheme : AppLightTheme
  const [bgColor, setBgColor] = useState("#ffffff")


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
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
            <Stack.Screen
              name={Screens.detail}
              component={NewsListScreen}
              options={{ headerShown: false, headerTitle: null }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style={scheme === 'dark' ? 'auto' : 'dark'} />
      </SafeAreaProvider>
    );
  }
}

const HomeTabs = () => {
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName={Screens.userNews} tabBar={props => <Bar {...props} />} tabBarOptions={{
      style: {
        backgroundColor: scheme === 'dark' ? AppDarkTheme.colors.background : AppLightTheme.colors.background
      }
    }}>
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
        name={Screens.userNews}
        component={UserNewsScreen}
        options={{
          title: "Vlastní výběr",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={20} />
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
    </Tab.Navigator>
  );
};
