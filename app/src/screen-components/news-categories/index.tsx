import React from "react";
import TabViewNews from "./news-tabview";
import { usePlayer } from "../../trackPlayerContext";
import ScreenWithMiniplayer from "../screenWithMiniplayer";

const NewsScreen = ({ navigation }) => {
  const { state } = usePlayer();

  return (
    <ScreenWithMiniplayer title="Nejnovější zprávy">
      <TabViewNews style={{ marginBottom: state.queue.length > 0 ? 88 : 0 }} />
    </ScreenWithMiniplayer>
  );
};

export default NewsScreen;
