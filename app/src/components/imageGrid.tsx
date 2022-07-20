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

interface GridProps {
  images: string[];
}

const ImageGrid: FC<GridProps> = ({ images }) => {
  const theme = useTheme();

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [showImages, setShowImages] = useState(false);
  const loadingState = useRef(Array(9).fill(false)).current;

  useEffect(() => {
    if (showImages) {
      Animated.timing(imageOpacity, {
        duration: 300,
        toValue: 1,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [showImages]);

  const onLoad = (index: number) => {
    return () => {
      loadingState[index] = true;
      var isLoaded = loadingState.every(Boolean);
      if (isLoaded) {
        setShowImages(true);
      }
    };
  };

  const onError = (index: number) => {
    return (error: NativeSyntheticEvent<ImageErrorEventData>) => {
      console.error("failed to load image: " + error);
    };
  };

  const style = StyleSheet.create({
    container: {
      width: 42,
      height: 30,
      borderRadius: 8,
      backgroundColor: theme.colors.skeletonLight,
      marginStart: 4,
    },
    image: {
      width: 42,
      height: 30,
      borderRadius: 8,
      position: "absolute",
      resizeMode: "contain",
    },
  });

  return (
    <View style={{ alignItems: "flex-start", marginEnd: 24 }}>
      {Array(3)
        .fill(null)
        .map((value, row) => (
          <View
            key={"r" + row}
            style={{ flexDirection: "row", marginTop: row > 0 ? 4 : 0 }}
          >
            {Array(3)
              .fill(null)
              .map((value, column) => {
                const imagePosition = row * 3 + column;
                return (
                  <View key={"i" + imagePosition} style={style.container}>
                    <Animated.Image
                      style={[style.image, { opacity: imageOpacity }]}
                      source={{ uri: images[imagePosition] }}
                      onLoad={onLoad(imagePosition)}
                      onError={onError(imagePosition)}
                    ></Animated.Image>
                  </View>
                );
              })}
          </View>
        ))}
    </View>
  );
};

export default ImageGrid;
