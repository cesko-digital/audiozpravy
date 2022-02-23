import RNTrackPlayer, {
  Track,
  Capability,
  Event,
  State,
  useTrackPlayerEvents as _useTrackPlayerEvents,
} from "react-native-track-player";
export {
  Track,
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "./shared/article";

declare type Handler = (payload: { type: Event; [key: string]: any }) => void;

class TrackPlayer {
  private static instance: TrackPlayer;

  static getInstance() {
    if (!TrackPlayer.instance) {
      TrackPlayer.instance = new TrackPlayer();
      TrackPlayer.instance.init();
      return TrackPlayer.instance;
    }

    return TrackPlayer.instance;
  }

  private init() {
    RNTrackPlayer.setupPlayer({});

    const capabilities = [Capability.Play, Capability.Pause, Capability.SeekTo];
    const options = {
      stopWithApp: false,
      capabilities,
      compactCapabilities: capabilities,
    };
    RNTrackPlayer.updateOptions(options);
    // this.initPlayerQueue();
  }

  public registerService() {
    console.info("TrackPlayer.registerService()");
    RNTrackPlayer.registerPlaybackService(() => require("./services/audio"));
  }

  private async clearQueue() {
    const queue = await RNTrackPlayer.getQueue();

    var indexesToRemove = new Array(queue.length);
    for (let i = 0; i < queue.length; i++)
      indexesToRemove[i] = queue.length - 1 - i;

    for (const id of indexesToRemove) {
      await RNTrackPlayer.remove([id]);
    }
  }

  public async setActiveTrack(track: Track) {
    await RNTrackPlayer.stop();
    await this.clearQueue();
    return await RNTrackPlayer.add(track);
  }

  /**
   * Same as setActiveTrack but starts playing
   * @param track
   */
  public async playTrack(track: Track) {
    RNTrackPlayer.stop();
    this.clearQueue();
    RNTrackPlayer.add(track);
    RNTrackPlayer.play();
  }

  public async play() {
    RNTrackPlayer.play();
  }

  public async pause() {
    RNTrackPlayer.pause();
  }

  public async seekTo(position: number) {
    return await RNTrackPlayer.seekTo(position);
  }

  public async resetPlayer() {
    console.info("TrackPlayer.resetPlayer()");
    await RNTrackPlayer.reset();
  }
}

const playerInstance = TrackPlayer.getInstance();
export default playerInstance;
