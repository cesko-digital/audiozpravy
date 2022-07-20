import React, { FC } from "react";
import { Text, TouchableOpacity, ViewStyle, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import useFonts from "../../theme/fonts";

interface Props {
  isEnabled: boolean;
  style?: ViewStyle;
  onPress(): void;
}

const MainButton: FC<Props> = ({
  isEnabled = true,
  style,
  onPress,
  children,
}) => {
  const theme = useTheme();
  const fonts = useFonts();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isEnabled
          ? theme.colors.primaryButton
          : theme.colors.primaryButtonDisabled,
        borderRadius: 40,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        ...style,
      }}
      onPress={() => {
        if (isEnabled) {
          onPress();
        }
      }}
    >
      <Text
        style={StyleSheet.compose(fonts.titleRegular, {
          color: theme.colors.primaryButtonLabel,
          lineHeight: 24,
          marginRight: 8,
        })}
      >
        {children}
      </Text>
      <FontAwesome5
        name="chevron-right"
        size={12}
        color={theme.colors.primaryButtonLabel}
      />
    </TouchableOpacity>
  );
};

export default MainButton;
