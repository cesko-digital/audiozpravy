import React, { FC, useMemo } from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  ViewProps,
} from "react-native";
import Color from "../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props extends ViewProps {
  selected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const PlusIcon: FC<Props> = ({ style, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <MaterialCommunityIcons
      name={selected ? "check" : "plus"}
      color={Color["black-32"]}
      size={24}
    />
  </TouchableOpacity>
);

export default PlusIcon;
