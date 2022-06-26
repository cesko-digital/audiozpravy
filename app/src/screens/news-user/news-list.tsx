import React, { FC } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ViewProps,
} from "react-native";
import { usePlayer } from "../../providers/PlayerContextProvider";
import { useTheme } from "../../theme";
import { Article } from "../../shared/article";
import { TimeRangeItem } from "./news-filter";
import ListItem from "./components/ListItem";
import LoadingAnimation from "@components/ui/LoadingAnimation";
import EmptyListView from "@components/ui/EmptyListView";
import { useArticlesData } from "./hooks/useArticlesData";

interface Props extends ViewProps {
  categories: string[];
  timeRange: TimeRangeItem | null;
}

const NewsNavList: FC<Props> = ({ style, categories, timeRange }) => {
  const theme = useTheme();
  const { addArticle } = usePlayer();
  const { articlesData, refreshing, loading, refetch, fetchNext, error } =
    useArticlesData({
      categories: categories,
      timeRange: timeRange,
    });

  const addToQueue = (item: Article) => {
    addArticle(item);
  };

  const onItemPress = (item: Article) => addToQueue(item);
  const onPlusPress = (item: Article) => addToQueue(item);

  const renderItem = ({ item }: { item: Article }) => {
    return (
      <ListItem item={item} onPlusPress={onPlusPress} onPress={onItemPress} />
    );
  };

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginStart: 16,
      marginEnd: 16,
    },
  });

  if (loading) {
    return <LoadingAnimation style={style} />;
  }

  if (error) {
    console.warn(error.message);
    return <EmptyListView message="Někde se stala chyba :(" />;
  }

  return (
    <FlatList
      data={articlesData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={StyleSheet.compose({ flex: 1 }, style)}
      ItemSeparatorComponent={({ highlighted }) => (
        <View style={styles.separator}></View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }
      onEndReached={fetchNext}
      onEndReachedThreshold={0.1}
      contentContainerStyle={[
        { flexGrow: 1 },
        articlesData.length ? null : { justifyContent: "center" },
      ]}
      ListEmptyComponent={<EmptyListView message="Jsem tak prázdný :(" />}
    />
  );
};

export default NewsNavList;
