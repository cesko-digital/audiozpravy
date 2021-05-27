import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopicsScreen from "./screen-components/topics";
import { Screens } from "./screens";
import OnboardingScreen from "./screen-components/onboarding";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.onboarding} component={OnboardingScreen} />
        <Stack.Screen name={Screens.topics} component={TopicsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
