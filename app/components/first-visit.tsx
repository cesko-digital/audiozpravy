import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import RNGestureHandlerButton from "react-native-gesture-handler/lib/typescript/components/GestureHandlerButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "../shared/colors";
import CreateListButton from "./buttons/create-list-button";
import PlaySelectedButton from "./buttons/play-selected-button";
import Description from "./typography/description";
import { Screens } from "../screens";

const FirstVisit = ({ navigation }) => {
  return (
    <>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>10 zpráv k přehrání</Text>
          <Description style={styles.description}>
            Máme pro Vás připraveno 10 zpráv, přehrajte si je všechny nebo si
            pomocí plus vytvořte vlastní seznam.
          </Description>
          <PlaySelectedButton
            onPress={() => {
              console.log("Zobrazit výpis zpráv");
            }}
          >
            Spustit výběr nejnovějších zpráv
          </PlaySelectedButton>
          <CreateListButton
            onPress={() => {
              alert("Přepnout na frontu");
            }}
          >
            Zavřít a vytvořit svůj seznam
          </CreateListButton>
        </View>
      </View>
    </>
  );
};

var styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 328,
    textAlign: "center",
  },

  title: {
    fontFamily: "RobotoBold",
    fontSize: 24,
  },

  description: {
    fontFamily: "RobotoLight",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 24,
  },
});

export default FirstVisit;
