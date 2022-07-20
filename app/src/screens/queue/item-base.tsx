import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";

type Props = { firstLine: string | undefined; secondLine: string | undefined };

const ItemBase = ({ firstLine, secondLine }: Props) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (
    <View style={{}}>
      <Text
        style={StyleSheet.compose(fonts.titleXSmall, {
          color: theme.colors.textInverse,
          lineHeight: 20,
        })}
        numberOfLines={3}
      >
        {firstLine}
      </Text>
      <Text
        style={StyleSheet.compose(fonts.textXSmall, {
          color: theme.colors.textLight,
        })}
      >
        {secondLine}
      </Text>
    </View>
  );
};

export default ItemBase;
