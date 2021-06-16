import React from "react";
import { Text } from "react-native";
import MainButton from "../components/buttons/main-button";
import { Screens } from "../screens";

const TopicsScreen = ({ navigation }) => {
  return (
    <>
      <Text>Topics</Text>
      <MainButton onPress={() => navigation.navigate(Screens.home)}>
        Poslechnout si výběr
      </MainButton>
    </>
  );
};

export default TopicsScreen;
