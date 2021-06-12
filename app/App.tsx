import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import TopicsScreen from "./screen-components/topics";
import { Screens } from "./screens";
import OnboardingScreen from "./screen-components/onboarding";

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Screens.onboarding}
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={Screens.topics} component={TopicsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
