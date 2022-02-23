import React, { useState } from "react";
import NewsList from "./news-list";
import NewsFilter from "./news-filter";
import ScreenWithMiniplayer from "../screenWithMiniplayer";
import { usePlayer } from "../../trackPlayerContext";

const UserNewsScreen = ({ route, navigation }) => {
  const [selectedCategories, setCategories] = useState([]);
  const [selectedTimeRange, setTimeRange] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { state } = usePlayer();

  const onFilterChange = (
    selectedCategories: string[],
    selectedTimeRange: number
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
