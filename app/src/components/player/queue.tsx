import React, { FC } from "react";
import { TouchableOpacityProps, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../typography/title";
import { FontAwesome5 } from "@expo/vector-icons";

import Color from "../../theme/colors";
import { Screens } from "../../screens";

const Queue: FC<{
  size: number;
  currentIndexZeroBased: number;
}> = ({ size, currentIndexZeroBased }) => {
  const currentItemNumber = (size > 0) ? currentIndexZeroBased + 1 : 0;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Title size={3} color="white">
        Fronta {currentItemNumber} / {size}
      </Title>
      <OpenQueue />
    </View>
  );
};

export default Queue;

const OpenQueue: FC<TouchableOpacityProps> = (props) => {
  const { navigate } = useNavigation()
  const navigateToNestedScreen = () => navigate(Screens.home, { screen: Screens.queue })

  return (
    <TouchableOpacity
      onPress={navigateToNestedScreen}
      style={{
        height: 24,
        width: 24,
        backgroundColor: "white",
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <FontAwesome5 name="chevron-right" size={12} color={Color["black-100"]} />
    </TouchableOpacity>
  )
}
