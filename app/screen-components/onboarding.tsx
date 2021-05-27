import React from "react";
import { Text, Button } from "react-native";
import { Screens } from "../screens";

const OnboardingScreen = ({ navigation }) => {
  return (
    <>
      <Text>Audio zprávy</Text>
      <Text>
        Všechny zprávy ze všech zpravodajských portálů pro Vás jako audio.
        Pusťte si 30s ukázky zadarmo nebo si kupte kredity a poslechněte si
        dlouhou verzi. Stačí si jen naklikat frontu zpráv nebo nechte výběr na
        naší umělé inteligenci, která se neustále učí z Vašich reakcí.
      </Text>
      <Button
        title="Nastavit témata"
        onPress={() => navigation.navigate(Screens.topics)}
      />
    </>
  );
};

export default OnboardingScreen;
