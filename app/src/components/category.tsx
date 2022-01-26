import React, { FC } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Description from "./typography/description";
interface Props {
  title: string;
}

const Category: FC<Props> = (prob) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Description style={styles.title}>{prob.title}</Description>
      <FontAwesome5 style={styles.arrow} name="chevron-right" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: 140,
    marginTop: 5,
  },
  title: {},
  arrow: {}
});
export default Category;
