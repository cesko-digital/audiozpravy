import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme, Appearance, ViewProps, View } from "react-native";
import Bar from "@components/navigation/bar";
import { AppDarkTheme, AppLightTheme } from "@app/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewsScreen from "@screens/news-categories";
import UserNewsScreen from "@screens/news-user";
import QueueScreen from "@screens/queue";
import SettingsScreen from "@screens/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screens } from "../screens";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const scheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName={Screens.news}
      tabBar={(props) => <Bar {...props} />}
      tabBarOptions={{
        style: {
          backgroundColor:
            scheme === "dark"
              ? AppDarkTheme.colors.background
              : AppLightTheme.colors.background,
        },
      }}
    >
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

export default Tabs;
