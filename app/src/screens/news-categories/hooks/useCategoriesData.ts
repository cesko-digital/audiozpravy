import React, { FC, useState, useRef, useEffect } from "react";
import {
  PlaylistsForThisWeekQuery,
  PlaylistsForTodayQuery,
  usePlaylistsForThisWeekQuery,
  usePlaylistsForTodayQuery,
} from "../../../graphql/generated/schema";
import categories, { ArticleCategory } from "@app/shared/categories";
import { Article } from "@app/shared/article";
import { parseJSON } from "date-fns";
import { NetworkStatus } from "@apollo/client";
import ScreenVariant from "../screenVariant";

interface Props {
  variant: ScreenVariant;
}

export function useCategoriesData({ variant }: Props) {
  const useQquery =
    variant == ScreenVariant.today
      ? usePlaylistsForTodayQuery
      : usePlaylistsForThisWeekQuery;
  const { data, loading, error, refetch, networkStatus } = useQquery({
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });
  const [categoriesData, setCategoriesData] = useState<ArticleCategory[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    setRefreshing(networkStatus === NetworkStatus.refetch);
  }, [networkStatus, loading]);

  useEffect(() => {
    if (data != null && data != undefined) {
      setCategoriesData(enrichData(data));
    }
  }, [data]);

  const enrichData = (
    data: PlaylistsForThisWeekQuery | PlaylistsForTodayQuery
  ) => {
    if (data?.playlists == null || data?.playlists == undefined) {
      return [];
    }
    const enrichedData = data?.playlists?.flatMap((item) => {
      if (item == null || item == undefined) {
        return [];
      }
      const category = categories.filter((c) => {
        return c.key == item.category.key;
      })[0];

      if (category) {
        var articles = item.articles.slice(0, 9).map((article) => {
          const randomTrackNumber = Math.floor(Math.random() * 15 + 1);
          const mappedArticle: Article = {
            ...article,
            publishedAt: parseJSON(article.publishedAt),
            artist: article.artist.name,
            img: "https://picsum.photos/200/140/?id" + article.id,
            lastPosition: 0,
            duration: 0,
            played: false,
            url:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-" +
              randomTrackNumber +
              ".mp3",
          };
          return mappedArticle;
        });
        const enriched: ArticleCategory = { ...category, articles: articles };
        return [enriched];
      } else {
        return [];
      }
    });
    return enrichedData;
  };

  return React.useMemo(
    () => ({
      categoriesData,
      refreshing,
      loading,
      refetch,
      error,
    }),
    [categoriesData, refreshing, loading, refetch, error]
  );
}
