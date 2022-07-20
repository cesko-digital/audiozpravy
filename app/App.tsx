import React, { FC, useState, useEffect } from "react";
import { useColorScheme, Appearance, ViewProps, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { AppDarkTheme, AppLightTheme } from "@app/theme";
import { loadFonts } from "@app/theme/fonts";
import { getPreferredTopics, getUserUUID } from "@app/securePreferences";
import client from "@app/services/apiClient";

import TrackPlayer from "@app/trackPlayer";
import PlayerContextProvider from "@app/providers/PlayerContextProvider";
import { ApolloProvider } from "@apollo/client";
import { useRegisterListerner } from "@app/hooks/useRegisterListener";
import MainStack from "@app/navigation/main-stack";

export default function App() {
  const [userUUID, setUserUUID] = useState<string | null>(null);
  const [preferredTopics, setPreferredTopics] = useState<string[]>([]);
  const [fontsLoaded] = loadFonts();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? AppDarkTheme : AppLightTheme
  );
  const registerListener = useRegisterListerner();

  useEffect(() => {
    TrackPlayer.registerService();

    getUserUUID().then((userUUID) => {
      setUserUUID(userUUID);
      registerListener(userUUID);
    });

    getPreferredTopics().then((topics) => {
      setPreferredTopics(topics);
    });

    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? AppDarkTheme : AppLightTheme);
    });
  }, []);

  if (!fontsLoaded || userUUID == null) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <PlayerContextProvider>
            <NavigationContainer theme={theme}>
              <MainStack preferredTopics={preferredTopics} />
            </NavigationContainer>
            <StatusBar style={colorScheme === "dark" ? "auto" : "dark"} />
          </PlayerContextProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
