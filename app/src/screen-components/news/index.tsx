import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import NewsList from "./news-list";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fonts from "../../theme/fonts";
import { useTheme } from '../../theme'

const NewsScreen = ({ route, navigation }) => {
  const { id, title, colors, image } = route.params;
  const theme = useTheme();
  const fonts = Fonts(theme);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: '100%', height: 62 }}>
        {(image != null) &&
          <Image source={image} style={{ width: '100%', height: 62, position: 'absolute', opacity: 0.25 }} />
        }
        <View style={{ height: 62, justifyContent: 'center', flex: 1 }}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={theme.colors.textInverse}
            size={36}
            style={{ position: 'absolute', top: 6, left: 0, padding: 6 }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <Text style={StyleSheet.compose(fonts.titleLarge, { color: theme.colors.textInverse })}>
              {title}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <NewsList topic={id} />
    </View>
  );
};

export default NewsScreen
