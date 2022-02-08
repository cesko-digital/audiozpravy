import React, { FC, useMemo } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  RefreshControl,
  ViewProps,
} from "react-native";
import Color from "../../theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TrackPlayer from "../../trackPlayer";
import RNTrackPlayer from "react-native-track-player";
import { usePlayer } from "../../trackPlayerContext";
import useFonts from "../../theme/fonts";
import { useTheme } from "../../theme";
import { Article } from "../../shared/article";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { TimeRange, TimeRangeItem } from "./news-filter";
import { subDays, subHours, format, parseJSON } from "date-fns";
import { cs } from "date-fns/locale";
import { debug } from "react-native-reanimated";

interface Props extends ViewProps {
  selected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const PlusIcon: FC<Props> = ({ style, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 24,
      width: 24,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <MaterialCommunityIcons
      name={selected ? "check" : "plus"}
      color={Color["black-32"]}
      size={24}
    />
  </TouchableOpacity>
);

interface ItemProps {
  item: Article;
  onPress: (item: Article) => void;
  onPlusPress: (item: Article) => void;
}

const Item: FC<ItemProps> = ({ item, onPress, onPlusPress }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const { state } = usePlayer();

  const [inQueue, setInQueue] = useState(false);

  useEffect(() => {
    const queue = RNTrackPlayer.getQueue().then((queue) => {
      const filtered = queue.filter((value, index, array) => {
        return value.id == item.id;
      });
      setInQueue(filtered.length > 0);
    });
  }, [state]);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingStart: 16,
          paddingEnd: 16,
          paddingBottom: 14,
          paddingTop: 14,
        }}
      >
        <View style={{ width: 68, height: 50 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              backgroundColor: "gray",
            }}
            source={{
              uri: item.img,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            onPress(item);
          }}
          style={{
            flex: 1,
            marginStart: 16,
            marginEnd: 8,
          }}
        >
          <View style={{}}>
            <Text style={fonts.titleSmall} numberOfLines={2}>
              {item.title}
            </Text>
            <Text
              style={StyleSheet.compose(fonts.textXSmall, {
                color: theme.colors.textLight,
              })}
            >
              {format(item.published, "do MMMM, HH:mm", { locale: cs })}
            </Text>
          </View>
        </TouchableOpacity>
        <PlusIcon
          onPress={() => {
            onPlusPress(item);
          }}
          selected={inQueue}
        />
      </View>
    </View>
  );
};

const QUERY = gql`
  query Articles(
    $first: Int
    $after: String
    $categories: [ID]
    $gteDate: DateTime
    $lteDate: DateTime
  ) {
    articles(
      first: $first
      after: $after
      category_Key_In: $categories
      pubDate_Gte: $gteDate
      pubDate_Lte: $lteDate
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          url: recordingUrl
          published: pubDate
          provider {
            name
            id
          }
        }
      }
    }
  }
`;

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

interface NewsList extends ViewProps {
  categories: string[];
  timeRange: TimeRangeItem;
}

interface QueryVariables {
  first: number;
  after: string;
  categories: string[];
  gteDate?: string;
  lteDate?: string;
}

const getQueryVariables = (
  categories: string[],
  timeRange: TimeRangeItem
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
  console.info(params);
  return params;
};

const NewsNavList: FC<NewsList> = ({ style, categories, timeRange }) => {
  const theme = useTheme();
  const fonts = useFonts();
  const { setQueue } = usePlayer();

  const variables = useMemo(() => {
    return getQueryVariables(categories, timeRange);
  }, [categories, timeRange]);

  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery(
    QUERY,
    { variables: variables }
  );
  const [enrichedData, setEnrichedData] = useState([]);

  useEffect(() => {
    refetch();
  }, [variables]);

  const addToQueue = (item: Article) => {
    TrackPlayer.addTrackToQueue(item).then((queue) => {
      setQueue(queue);
      if (queue.length == 1) {
        RNTrackPlayer.play();
      }
    });
  };

  const onItemPress = (item: Article) => addToQueue(item);
  const onPlusPress = (item: Article) => addToQueue(item);

  const renderItem = ({ item }) => {
    return <Item item={item} onPlusPress={onPlusPress} onPress={onItemPress} />;
  };

  useEffect(() => {
    if (data == undefined) {
      return;
    }

    const enriched = data.articles.edges
      .filter((item) => {
        if (item.node != null) {
          return item;
        }
        return null;
      })
      .map((item, index) => {
        const randomTrackNumber = Math.floor(Math.random() * 15 + 1);
        return {
          ...item.node,
          published: parseJSON(item.node.published),
          img: "https://picsum.photos/200/140/?id" + item.node.id,
          url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-" +
            randomTrackNumber +
            ".mp3",
          artist: item.node.provider.name,
        };
      });
    setEnrichedData(enriched);
  }, [data]);

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginStart: 16,
      marginEnd: 16,
    },
  });

  const emptyView = () => (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
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
        Jsem tak prázdný :(
      </Text>
    </View>
  );

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (error) {
    console.warn(error.message);
    return <View style={{ flex: 1 }}>{emptyView()}</View>;
  }

  return (
    <FlatList
      data={enrichedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={StyleSheet.compose({ flex: 1 }, style)}
      ItemSeparatorComponent={({ highlighted }) => (
        <View style={styles.separator}></View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      onEndReached={() => {
        fetchMore({
          variables: {
            ...variables,
            after: data.articles.pageInfo.endCursor,
          },
        });
      }}
      onEndReachedThreshold={0.1}
      contentContainerStyle={[
        { flexGrow: 1 },
        enrichedData.length ? null : { justifyContent: "center" },
      ]}
      ListEmptyComponent={emptyView}
    />
  );
};

export default NewsNavList;
