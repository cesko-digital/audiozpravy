import React from "react";
import { View } from "react-native";

import { Screens } from "../../screens";
import MainButton from "../../components/buttons/main-button";
import Description from "../../components/typography/description";
import Title from "./title";
import LoginLink from "./login-link";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 120,
        paddingBottom: 56,
        backgroundColor: "white",
      }}
    >
      <View style={{ marginHorizontal: 56 }}>
        <Title />
        <Description style={{ marginTop: 28 }}>
          Všechny zprávy ze všech zpravodajských portálů pro Vás jako audio.
          Pusťte si 30s ukázky zadarmo nebo si kupte kredity a poslechněte si
          dlouhou verzi. Stačí si jen naklikat frontu zpráv nebo nechte výběr na
          naší umělé inteligenci, která se neustále učí z Vašich reakcí.
        </Description>
      </View>

      <View style={{ marginHorizontal: 48 }}>
        <MainButton onPress={() => navigation.navigate(Screens.topics)}>
          Nastavit témata
        </MainButton>
        <LoginLink style={{ marginTop: 32, display: "none" }} />
      </View>
    </View>
  );
};

export default OnboardingScreen;
