import React from "react";
import TabViewNews from "./tabview";
import { usePlayer } from "../../providers/PlayerContextProvider";
import ScreenWithMiniplayer from "../screenWithMiniplayer";

const NewsScreen = ({}) => {
  const { state } = usePlayer();

  return (
    <ScreenWithMiniplayer title="Nejnovější zprávy">
      <TabViewNews style={{ marginBottom: state.queue.length > 0 ? 88 : 0 }} />
    </ScreenWithMiniplayer>
  );
};

export default NewsScreen;
