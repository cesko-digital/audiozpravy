import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import NewsList from "../news/news-list";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import NewsFilter from "./news-filter";
import AppStatusBar from "../../components/statusBar"
import Player from "../../components/player";

const UserNewsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const fonts = useFonts();

  const [selectedCategories, setCategories] = useState([]);
  const [selectedTimeRanges, setTimeRanges] = useState([]);
  const [selectedTypes, setTypes] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const onFilterChange = (selectedCategories: number[], selectedTimeRanges: number[], selectedTypes: number[]) => {
    setCategories(selectedCategories)
    setTimeRanges(selectedTimeRanges)
    setTypes(selectedTypes)
    console.log("selectedCategories: " + selectedCategories)
  }

  return (
    <View style={{ flex: 1 }}>
      <AppStatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View
        style={{
          paddingStart: 16,
          paddingTop: 24,
          paddingBottom: 8
        }}
      >
        <Text style={StyleSheet.compose(fonts.titleLarge, { color: theme.colors.text })}>
          Vlastní výběr zpráv
        </Text>
      </View>

      <NewsFilter initialCategories={selectedCategories} initialTimeRanges={selectedTimeRanges} initialTypes={selectedTypes}
        isExpanded={expanded}
        onFilterChange={onFilterChange}
        onExpadedChange={(isExpanded) => { setExpanded(isExpanded) }} />

      <NewsList topic={null} />

      <Player
        style={{}}
      ></Player>
    </View>
  )
}


export default UserNewsScreen
