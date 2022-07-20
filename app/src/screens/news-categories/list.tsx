import React, { FC } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ArticleCategory } from "../../shared/categories";
import { Article } from "../../shared/article";
import { usePlayer } from "../../providers/PlayerContextProvider";
import LoadingAnimation from "@app/components/ui/LoadingAnimation";
import EmptyListView from "@app/components/ui/EmptyListView";
import { useCategoriesData } from "./hooks/useCategoriesData";
import ScreenVariant from "./screenVariant";
import Item from "./components/list-item";

interface Props {
  variant: ScreenVariant;
}

const NewsNavList: FC<Props> = ({ variant }) => {
  const { addArticle } = usePlayer();
  const { categoriesData, refreshing, loading, refetch, error } =
    useCategoriesData({ variant: variant });

  const addToQueue = (articles: Article[]) => {
    articles.forEach((a) => {
      addArticle(a);
    });
  };

  const onItemPress = (item: ArticleCategory) => {
    addToQueue(item.articles);
  };

  const renderItem = ({ item }: any) => {
    const dayNumber = new Date().getDay();
    const weekLabel = dayNumber == 0 ? "Minulý týden" : "Tento týden";
    const weekNumber = variant == ScreenVariant.week ? weekLabel : null;
    return (
      <Item
        item={item}
        weekNumber={weekNumber}
        images={item.images}
        onPress={onItemPress}
      />
    );
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    console.warn(error.message);
    return <EmptyListView message="Někde se stala chyba :(" />;
  }

  return (
    <FlatList
      data={categoriesData}
      renderItem={renderItem}
      keyExtractor={(item) => "topicID-" + item.key + "-" + variant.toString()}
      style={{}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            console.log("on refresh");
            refetch();
          }}
        />
      }
      contentContainerStyle={[
        { flexGrow: 1 },
        categoriesData.length ? null : { justifyContent: "center" },
      ]}
      ListEmptyComponent={<EmptyListView message="Jsem tak prázdný :(" />}
    />
  );
};

export default NewsNavList;
