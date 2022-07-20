import { FC } from "react";

import TopicsScreen from "@screens/onboarding-topics";
import OnboardingScreen from "@screens/onboarding";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "../screens";
import Tabs from "./tabs";

interface Props {
  preferredTopics: string[];
}

const Stack = createStackNavigator();

const MainStack: FC<Props> = ({ preferredTopics }) => {
  return (
    <Stack.Navigator>
      {preferredTopics.length < 3 && (
        <Stack.Screen
          name={Screens.onboarding}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      )}
      {preferredTopics.length < 3 && (
        <Stack.Screen
          name={Screens.topics}
          component={TopicsScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name={Screens.home}
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
