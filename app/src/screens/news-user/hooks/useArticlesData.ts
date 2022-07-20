import React, { useEffect, useMemo, useState } from "react";
import { ArticlesQuery, useArticlesQuery } from "@app/graphql/generated/schema";
import { Article } from "@app/shared/article";
import { subDays, subHours } from "date-fns";
import { TimeRange, TimeRangeItem } from "../news-filter";
import { NetworkStatus } from "@apollo/client";

interface QueryVariables {
  first: number;
  after: string;
  categories: string[];
  gteDate?: string;
  lteDate?: string;
}

// BE hotfix
function enrichData(queryData: ArticlesQuery): Article[] {
  if (queryData == undefined || queryData.myArticles == null) {
    return [];
  }
  const enriched: Article[] = queryData.myArticles?.edges.flatMap((item) => {
    const randomTrackNumber = Math.floor(Math.random() * 15 + 1);
    if (item?.node != null) {
      return {
        ...item.node,
        img: "https://picsum.photos/200/140/?id" + item.node.id,
        url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-" +
          randomTrackNumber +
          ".mp3",
        publishedAt: new Date(),
        //publishedAt: parseISO(item.node.pubDate),
        lastPosition: 0,
        duration: 0,
        played: false,
      };
    } else {
      return [];
    }
  });
  return enriched;
}

export const getTimeRange = (timeRange: TimeRangeItem): TimeRange => {
  switch (timeRange) {
    case TimeRangeItem.now:
      return { gteDate: subHours(new Date(), 2) };
    case TimeRangeItem.today:
      return { gteDate: subDays(new Date(), 1) };
    case TimeRangeItem.week:
      return { gteDate: subDays(new Date(), 7) };
    case TimeRangeItem.month:
      return { gteDate: subDays(new Date(), 31) };
  }
};

const getQueryVariables = (
  categories: string[],
  timeRange: TimeRangeItem | null
): QueryVariables => {
  var params: QueryVariables = {
    first: 30,
    after: "",
    categories: categories,
  };

  if (timeRange != null) {
    const selectedTimeRange = getTimeRange(timeRange);
    if (selectedTimeRange.gteDate) {
      params.gteDate = selectedTimeRange.gteDate?.toISOString();
    }
    if (selectedTimeRange.lteDate) {
      params.lteDate = selectedTimeRange.lteDate?.toISOString();
    }
  }
  return params;
};

interface Props {
  categories: string[];
  timeRange: TimeRangeItem | null;
}

export function useArticlesData({ categories, timeRange }: Props) {
  const [articlesData, setEnrichedData] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const variables = useMemo(() => {
    return getQueryVariables(categories, timeRange);
  }, [categories, timeRange]);
  const { data, loading, error, refetch, networkStatus, fetchMore } =
    useArticlesQuery({
      variables: variables,
    });

  data?.myArticles?.pageInfo;

  useEffect(() => {
    refetch();
  }, [variables]);

  useEffect(() => {
    //console.log("networkStatus=" + networkStatus);
    //console.log("loading=" + loading);
    setRefreshing(networkStatus === NetworkStatus.refetch);
  }, [networkStatus, loading]);

  useEffect(() => {
    if (data == undefined || data.myArticles == null) {
      return;
    }
    if (data.myArticles != null && data.myArticles != undefined) {
      const enriched: Article[] = enrichData(data);
      setEnrichedData(enriched);
    }
  }, [data]);

  const fetchNext = () => {
    console.log("fetchNext()");
    return fetchMore({
      variables: {
        ...variables,
        after: data?.myArticles?.pageInfo.endCursor,
      },
    })
      .catch((error) => {
        console.log("fetchMore call failed with error: " + error);
      })
      .then((newData) => {
        if (newData) {
          console.log("fetchMore call completed with data: " + newData.data);
          const newEnriched: Article[] = enrichData(newData.data);
          const merged = [...articlesData, ...newEnriched];
          setEnrichedData(merged);
        }
      });
  };

  return React.useMemo(
    () => ({
      articlesData,
      refreshing,
      loading,
      refetch,
      fetchNext,
      error,
    }),
    [articlesData, refreshing, loading, refetch, fetchNext, error]
  );
}
