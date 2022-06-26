import React, { useState } from "react";
import NewsList from "./news-list";
import NewsFilter, { TimeRangeItem } from "./news-filter";
import ScreenWithMiniplayer from "../screenWithMiniplayer";
import { usePlayer } from "../../providers/PlayerContextProvider";
import { RootStackParamList } from "@app/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const UserNewsScreen = ({ route, navigation }: Props<"UserNewsScreen">) => {
  const [selectedCategories, setCategories] = useState<string[]>([]);
  const [selectedTimeRange, setTimeRange] = useState<TimeRangeItem | null>(
    null
  );
  const [expanded, setExpanded] = useState(false);
  const { state } = usePlayer();

  const onFilterChange = (
    selectedCategories: string[],
    selectedTimeRange: TimeRangeItem | null
  ) => {
    setCategories(selectedCategories);
    setTimeRange(selectedTimeRange);
  };

  return (
    <ScreenWithMiniplayer title="Vlastní výběr zpráv">
      <NewsFilter
        initialCategories={selectedCategories}
        initialTimeRange={selectedTimeRange}
        isExpanded={expanded}
        onFilterChange={onFilterChange}
        onExpadedChange={(isExpanded) => {
          setExpanded(isExpanded);
        }}
      />

      <NewsList
        categories={selectedCategories}
        timeRange={selectedTimeRange}
        style={{ marginBottom: state.queue.length > 0 ? 88 : 0 }}
      />
    </ScreenWithMiniplayer>
  );
};

export default UserNewsScreen;
