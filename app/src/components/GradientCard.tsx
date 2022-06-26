import React, { FC, useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  RefreshControl,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import categories, { ArticleCategory } from "../shared/categories";
import { useTheme } from "../theme";
import useFonts from "../theme/fonts";
import ImageGrid from "./imageGrid";

export interface Props {
  item: ArticleCategory;
  weekNumber: string | null;
  images: string[];
  onPress: (item: ArticleCategory) => void;
}

export const GradientCard: FC<Props> = ({
  item,
  weekNumber,
  images,
  onPress,
}) => {
  const fonts = useFonts();
  const theme = useTheme();

  return (
    <View
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        paddingStart: 16,
        paddingEnd: 16,
      }}
    >
      <TouchableOpacity
        style={{}}
        onPress={() => {
          onPress(item);
          //alert('playlist added to queue')
        }}
      >
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 8 }}
        >
          {item.image != null && (
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: 124,
                position: "absolute",
                opacity: 0.25,
              }}
            />
          )}
          <View
            style={{
              height: item.image != null ? 124 : 74,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingStart: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 30,
                }}
              >
                <MaterialCommunityIcons name="play" color="black" size={24} />
              </View>

              <View
                style={{ alignItems: "flex-start", marginStart: 8, flex: 1 }}
              >
                <Text
                  key={"category-title-" + item.id}
                  style={StyleSheet.compose(fonts.titleLarge, {
                    color: theme.colors.textInverse,
                  })}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: item.colors[0],
                    paddingHorizontal: 4,
                    paddingVertical: 3,
                  }}
                >
                  <FontAwesome5 name="clock" color="#FFF4B9" size={15} />
                  <Text
                    style={StyleSheet.compose(fonts.titleXSmall, {
                      marginStart: 4,
                      color: "#FFF4B9",
                    })}
                  >
                    {weekNumber != null ? weekNumber : "DNES"}
                  </Text>
                </View>
              </View>

              {item.image != null && <ImageGrid images={images}></ImageGrid>}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
