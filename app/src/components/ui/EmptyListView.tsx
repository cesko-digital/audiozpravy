import React, { FC, useRef } from "react";
import { View, ViewProps, StyleSheet, Text, ViewPropTypes } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";

interface Props extends ViewProps {
  message: string;
}

const EmptyListView: FC<Props> = ({ style, message }) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Ionicons
        size={48}
        name="sad-outline"
        style={{}}
        color={theme.colors.textLight}
      />
      <Text
        style={StyleSheet.compose(fonts.textReguar, {
          color: theme.colors.textLight,
        })}
      >
        {message}
      </Text>
    </View>
  );
};

export default EmptyListView;
