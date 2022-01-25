import React, { FC, useState, createContext, useContext } from "react";
import RNTrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
  State,
} from "react-native-track-player";
import { initialPlayerState, PlayerState } from "./trackPlayer";
import { logArticlePlayed } from "./api/listener";

export type PlayerContextState = {
  state: PlayerState;
  setQueue: (queue: Track[]) => void;
  setState: (state: PlayerState) => void;
};

const contextDefaultValues: PlayerContextState = {
  state: initialPlayerState,
  setQueue: () => {},
  setState: () => {},
};

export const PlayerContext =
  createContext<PlayerContextState>(contextDefaultValues);

export function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}

export async function createPlayerState() {
  const queue = await RNTrackPlayer.getQueue();
  const currentIndex = await RNTrackPlayer.getCurrentTrack();
  const state = await RNTrackPlayer.getState();
  var track: Track = null;
  if (currentIndex != null) {
    track = await RNTrackPlayer.getTrack(currentIndex);
  }

  return {
    currentTrack: track,
    currentIndex: currentIndex,
    recordsCount: queue.length,
    isPlaying: state == State.Playing,
  };
}

const PlayerContextProvider: FC = ({ children }) => {
  const [state, _setState] = useState<PlayerState>(contextDefaultValues.state);

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged, Event.PlaybackError],
    async (event) => {
      const newState = await createPlayerState();
      setState(newState);

      if (event.type == Event.PlaybackTrackChanged) {
        const prevTrackIndex = event.track;
        if (prevTrackIndex != null) {
          const prevTrack = await RNTrackPlayer.getTrack(prevTrackIndex);
          const prevTrackPosition = event.position;
          if (
            prevTrack != null &&
            prevTrackPosition != null &&
            prevTrackPosition > 5
          ) {
            logArticlePlayed(prevTrack.id);
          }
        }
        const nextTrack = event.nextTrack;
      }
    }
  );

  const setQueue = async (queue: Track[]) => {
    var newState = await createPlayerState();
    _setState(newState);
  };

  const setState = (state: PlayerState) => {
    _setState(state);
  };

  return (
    <PlayerContext.Provider value={{ state, setQueue, setState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
