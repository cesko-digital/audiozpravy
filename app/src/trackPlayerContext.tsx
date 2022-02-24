import React, {
  FC,
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import playerInstance, {
  useProgress,
  useTrackPlayerEvents,
  Event,
} from "./trackPlayer";
import { logArticlePlayed } from "./api/listener";
import { Article } from "./shared/article";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TrackProgress = {
  position: number;
  duration: number;
  buffered: number;
};

export type PlayerState = {
  currentTrack: Article;
  queue: Article[];
  isPlaying: boolean;
};

export const initialPlayerState: PlayerState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
};

export type PlayerContextState = {
  state: PlayerState;
  progress: TrackProgress;
  playPause: () => void;
  playArticle: (id: String) => void;
  addArticle: (article: Article) => void;
  skipToNext: () => void;
  seekTo: (position: number) => void;
  setPlayed: (article: Article) => void;
  clearQueue: () => void;
};

const contextDefaultValues: PlayerContextState = {
  state: initialPlayerState,
  progress: { position: 0, duration: 0, buffered: 0 },
  clearQueue: () => {},
  playPause: () => {},
  playArticle: (id: String) => {},
  addArticle: (article: Article) => {},
  skipToNext: () => {},
  seekTo: (position: number) => {},
  setPlayed: (article: Article) => {},
};

export const PlayerContext =
  createContext<PlayerContextState>(contextDefaultValues);

export function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}

const QUEUE_STORAGE_KEY = "audio_queue";

const PlayerContextProvider: FC = ({ children }) => {
  const [state, _setState] = useState<PlayerState>(contextDefaultValues.state);
  const [progress, setProgress] = useState<TrackProgress>(
    contextDefaultValues.progress
  );
  const playerProgress = useProgress();

  // init
  useEffect(() => {
    getSavedState().then((savedState) => {
      if (savedState != null) {
        console.info("Loading saved state.");
        const notPlayingState = {
          ...savedState,
          isPlaying: false,
        };
        _setState(notPlayingState);
        if (notPlayingState.currentTrack != null) {
          playerInstance.setActiveTrack(notPlayingState.currentTrack);
        }
      }
    });
  }, []);

  useEffect(() => {
    setProgress(playerProgress);

    if (playerProgress.position > 5 && state.isPlaying) {
      reportCurrentTrackPlayback();
    }
  }, [playerProgress]);

  useEffect(() => {
    console.info("State changed");
    saveState();
  }, [state]);

  /**
   * State persisting
   */
  const getSavedState = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
      if (jsonData != null) {
        const stateObject: PlayerState = JSON.parse(jsonData);
        return stateObject;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const saveState = async () => {
    try {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem(QUEUE_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Player events handling
   */

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async (event) => {
    console.info("PlaybackQueueEnded", event, progress);
    const _state = {
      ...state,
      isPlaying: false,
    };
    _setState(_state);

    skipToNext();
  });

  /**
   * Send info about playback to the backend and store flag to the article
   */
  const reportCurrentTrackPlayback = () => {
    if (
      state.currentTrack != null &&
      state.currentTrack["isReported"] != true
    ) {
      logArticlePlayed(state.currentTrack.id);
      updateArticle(state.currentTrack, { isReported: true });
    }
  };

  /**
   * Add or change article properties in the queue
   */
  const updateArticle = (article: Article, data: any) => {
    const articleIndex = state.queue.findIndex((a) => a.id == article.id);
    if (articleIndex < 0) {
      console.debug("updateArticle", "article not found");
      return;
    }
    var updatedArticle = {
      ...article,
      ...data,
    };
    var queue = state.queue;
    queue[articleIndex] = updatedArticle;
    const _state = {
      ...state,
      queue: queue,
    };
    // when updated article is same as current track, apply changes also to them
    if (_state.currentTrack.id == article.id) {
      _state.currentTrack = updatedArticle;
    }

    _setState(_state);
  };

  const handleCurrentTrackChange = () => {
    // store playback information to the current article
    if (state.currentTrack != null) {
      updateArticle(state.currentTrack, {
        lastPosition: progress.position,
        duration: progress.duration,
      });
    }

    // hide article from queue if played more than 90%
    if (state.currentTrack != null) {
      const lastPosition = progress?.position ?? 0;
      const duration = progress?.duration ?? 1;
      const percentPosition = (lastPosition / duration) * 100;
      if (percentPosition > 90) {
        console.info("track played near the end..");
        updateArticle(state.currentTrack, { played: true });
      }
    }
  };

  const playArticle = async (id: String) => {
    console.info("playArticle", id);
    handleCurrentTrackChange();
    const article = state.queue.find((a) => a.id == id);
    console.info(article);
    if (article != null) {
      var _state = {
        ...state,
        currentTrack: article,
        isPlaying: true,
      };
      _setState(_state);

      await playerInstance.playTrack(article);

      if (
        article.lastPosition != undefined &&
        article.lastPosition != null &&
        article.lastPosition > 0
      ) {
        console.info("seekTo", article.lastPosition);
        setTimeout(() => {
          playerInstance.seekTo(article.lastPosition);
        }, 200);
      }
    }
  };

  const playPause = () => {
    console.info("playPause");

    if (state.currentTrack != null) {
      const newIsPlayingState = !state.isPlaying;
      var _state = {
        ...state,
        isPlaying: newIsPlayingState,
      };
      _setState(_state);
      if (newIsPlayingState) {
        playerInstance.play();
      } else {
        playerInstance.pause();
      }
    }
  };

  const addArticle = (article: Article) => {
    console.info("addArticle", article.id);
    const existingTracks = state.queue.filter((t) => t.id == article.id);
    if (existingTracks.length > 0) {
      console.info("Article with id " + article.id + " is already in queue.");
      return true;
    }

    // automatic start playing when queue was empty
    const notPlayedArticled = state.queue.filter((a) => a.played != true);
    if (notPlayedArticled.length == 0) {
      setTimeout(() => {
        playArticle(article.id);
      }, 100);
    }

    var _state = {
      ...state,
    };
    _state.queue.push(article);
    _setState(_state);
  };

  const skipToNext = () => {
    console.info("skipToNext");
    if (state.currentTrack != null) {
      const actualArticleIndex = state.queue.indexOf(state.currentTrack);
      console.info("actualArticleIndex", actualArticleIndex);
      if (actualArticleIndex < state.queue.length - 1) {
        const nextInQueue = state.queue[actualArticleIndex + 1];
        if (state.isPlaying) {
          // skip and play
          playArticle(nextInQueue.id);
        } else {
          // only skip track
          handleCurrentTrackChange();
          var _state = {
            ...state,
            currentTrack: nextInQueue,
          };
          _setState(_state);
        }
      } else {
        // last article in queue
        // TODO: fetch/play next recomended articles from BE
        console.info("last track in queue played");
        handleCurrentTrackChange();
        var _state = {
          ...state,
          isPlaying: false,
          currentTrack: null as Article,
        };
        _setState(_state);
        playerInstance.resetPlayer();
      }
    }
  };

  const seekTo = async (position: number) => {
    return await playerInstance.seekTo(position);
  };

  const setPlayed = (article: Article) => {
    updateArticle(article, { played: true });
  };

  const clearQueue = async () => {
    var _state = {
      ...state,
      isPlaying: false,
      currentTrack: null as Article,
      queue: [],
    };
    _setState(_state);
    playerInstance.resetPlayer();
    await AsyncStorage.removeItem(QUEUE_STORAGE_KEY);
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        progress,
        clearQueue,
        playPause,
        playArticle,
        addArticle,
        skipToNext,
        seekTo,
        setPlayed,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
