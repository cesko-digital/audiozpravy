import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts, Monda_700Bold } from "@expo-google-fonts/monda";

import TopicsScreen from "./screen-components/topics";
import { Screens } from "./screens";
import OnboardingScreen from "./screen-components/onboarding";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({ MondaBold: Monda_700Bold });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Screens.onboarding}
            component={OnboardingScreen}
          />
          <Stack.Screen name={Screens.topics} component={TopicsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
