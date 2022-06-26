import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../theme/colors";

type Props = {
  onPress: () => void;
  active: boolean;
};

const CategoryButton: FC<Props> = ({ children, onPress, active }) => {
  const activeStyle = active ? styles.activeButton : styles.button;
  const activeStyleText = active ? styles.activeText : styles.text;

  return (
    <TouchableOpacity style={activeStyle} onPress={onPress}>
      <Text style={activeStyleText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "#fff",
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: Color["black-100"],
    display: "flex",
    flexDirection: "row",
    margin: 3,
  },
  activeButton: {
    display: "flex",
    flexDirection: "row",
    margin: 3,
    borderRadius: 40,
    borderColor: Color["blue"],
    backgroundColor: Color["blue"],
    color: "#fff",
  },
  text: {
    fontSize: 14,
    fontFamily: "RobotoBold",
    lineHeight: 20,
    color: Color["black-100"],
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeText: {
    fontSize: 14,
    fontFamily: "RobotoBold",
    lineHeight: 20,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default CategoryButton;
