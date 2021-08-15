import React from "react";
import { Text, StyleSheet, TextInput, View, Button } from "react-native";
import MainButton from "./buttons/main-button";
import { FontAwesome5 } from "@expo/vector-icons";

const Search = ({ style }) => {
  return (
    <View
      style={StyleSheet.compose(
        {
          flexDirection: "row",
          backgroundColor: "#E7E7E7",
          alignContent: "center",
          padding: "none",
          borderRadius: 30,
          marginBottom: 20,
        },
        style
      )}
    >
      <View style={styles.searchInput}>
        <TextInput style={styles.input} />
        <FontAwesome5
          style={styles.searchIcon}
          name="search"
          size={16}
          color="#0D0B12"
        />
      </View>
      <MainButton style={styles.searchButton} children={"Hledat"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E7E7E7",
    alignContent: "center",
    padding: "none",
    borderRadius: 30,
    marginBottom: 20,
  },
  input: {
    flex: 3,
    paddingLeft: 39,
    backgroundColor: "#E7E7E7",
    borderRadius: 30,
  },
  searchIcon: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    position: "absolute",

    top: "28%",
    left: 15,
  },
  searchInput: {
    flex: 8,
  },
  searchButton: {
    flex: 1,
  },
});

export default Search;
