import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AppLoading from "expo-app-loading"
import { useFonts } from "expo-font"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { Screens } from "./src/screens"
import TopicsScreen from "./src/screen-components/onboarding-topics"
import OnboardingScreen from "./src/screen-components/onboarding"
import NewsScreen from "./src/screen-components/news-categories"
import UserNewsScreen from "./src/screen-components/user-news"
import QueueScreen from "./src/screen-components/queue"
import Bar from "./src/components/navigation/bar"
import { useColorScheme, Appearance } from 'react-native'
import { AppDarkTheme, AppLightTheme } from './src/theme'
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import TrackPlayer from './src/trackPlayer'
import PlayerContextProvider from "./src/trackPlayerContext"
import { ApolloProvider } from '@apollo/client'
import { usePreferences } from "./src/securePreferences"
import SettingsScreen from "./src/screen-components/settings"
import { REGISTER_USER } from "./src/shared/queries"
import { client, setAccessToken } from "./src/apiClient"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function App() {
  let [preferences, setPreferences] = useState(null)

  let [fontsLoaded] = useFonts({
    MondaBold: require("./assets/fonts/Monda-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  })

  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState(colorScheme === 'dark' ? AppDarkTheme : AppLightTheme)

  useEffect(() => {
    TrackPlayer.registerService()

    usePreferences().then((preferences) => {
      console.info('setPreferences')
      setPreferences(preferences)

      client.mutate({ mutation: REGISTER_USER, variables: { deviceID: preferences.userUUID } })
        .catch((error) => {
          console.error(error)
        })
        .then((result) => {
          const token = result.data.registerListener.token
          if (token) {
            setAccessToken(token)
          }
          console.info('access token', token)
        })
    })

    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? AppDarkTheme : AppLightTheme)
    })
  }, [])


  if (!fontsLoaded || preferences == null) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <PlayerContextProvider>
            <NavigationContainer theme={theme}>
              <Stack.Navigator>
                {preferences.preferredTopics.length < 3 && <Stack.Screen
                  name={Screens.onboarding}
                  component={OnboardingScreen}
                  options={{ headerShown: false }}
                />}
                {preferences.preferredTopics.length < 3 && <Stack.Screen
                  name={Screens.topics}
                  component={TopicsScreen}
                  options={{ headerShown: false }}
                />
                }
                <Stack.Screen
                  name={Screens.home}
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style={colorScheme === 'dark' ? 'auto' : 'dark'} />
          </PlayerContextProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    )
  }
}

const HomeTabs = () => {
  const scheme = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator initialRouteName={Screens.news} tabBar={props => <Bar {...props} />} tabBarOptions={{
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
            <MaterialCommunityIcons name="playlist-music" color={color} size={20}
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
            <MaterialCommunityIcons name="cog" color={color} size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
