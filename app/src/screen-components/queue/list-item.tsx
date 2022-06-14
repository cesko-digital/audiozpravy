import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { cs } from "date-fns/locale";

import ItemBase from "./item-base";

const Item = ({ item, isSelected, isPlaying, onPress, onIconPress }) => {
  const theme = useTheme();
  const fonts = useFonts();

  var formatted = "-";
  if (item.publishedAt) {
    if (typeof item.publishedAt === "string") {
      item.publishedAt = parseISO(item.publishedAt);
    }
    formatted = format(item.publishedAt, "do MMMM, HH:mm", { locale: cs });
  }
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingStart: 16,
          paddingEnd: 16,
          paddingBottom: 12,
          paddingTop: 12,
          backgroundColor: isSelected ? theme.colors.primary : "transparent",
        }}
      >
        <TouchableOpacity
          style={{ width: 56, height: 42 }}
          onPress={onIconPress}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
            source={{
              uri: item.img,
            }}
          />
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 30,
              marginTop: -36,
              marginLeft: 12,
            }}
          >
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              color="white"
              size={24}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPress}
          style={{
            flex: 1,
            marginStart: 16,
            marginEnd: 8,
          }}
        >
          <ItemBase
            firstLine={item.title}
            secondLine={`${formatted} ‧  ${item.artist}`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;
