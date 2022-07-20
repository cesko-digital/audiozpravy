import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppStatusBar from "../../components/statusBar";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";
import { ScrollView } from "react-native-gesture-handler";
import {
  getPreferredTopics,
  setPreferredTopics,
} from "../../securePreferences";
import { useState } from "react";
import { usePlayer } from "../../providers/PlayerContextProvider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@app/screens";
import { RouteProp } from "@react-navigation/core";

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

interface RowProps {
  title: string;
  value: string;
}

const Row: FC<RowProps> = ({ title, value }) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 24 }}>
      <Text style={fonts.titleRegular}>{title}</Text>
      <Text style={fonts.textReguar}>{value}</Text>
    </View>
  );
};

const SettingsScreen = ({ route, navigation }: Props<"SettingsScreen">) => {
  const theme = useTheme();
  const fonts = useFonts();
  const [preferredTopics, setTopics] = useState<string[]>([]);
  const { clearQueue } = usePlayer();

  useEffect(() => {
    getPreferredTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppStatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View
        style={{
          paddingStart: 16,
          paddingTop: 24,
          paddingBottom: 8,
        }}
      >
        <Text
          style={StyleSheet.compose(fonts.titleLarge, {
            color: theme.colors.text,
          })}
        >
          Nastavení
        </Text>
      </View>
      <ScrollView style={{ marginTop: 24 }}>
        <Row
          title="Preferované kategorie:"
          value={preferredTopics.join(", ")}
        ></Row>

        <View style={{ paddingVertical: 8, paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={() => {
              setPreferredTopics([]);
            }}
          >
            <Text style={{ color: theme.colors.primary }}>
              🛠 Smazat preferované kategorie
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingVertical: 8, paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={() => {
              clearQueue();
            }}
          >
            <Text style={{ color: theme.colors.primary }}>
              🥞 Smazat frontu přehrávače
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
