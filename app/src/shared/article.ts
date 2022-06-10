import { Track } from "react-native-track-player";

export interface Article extends Track {
  img: string;
  publishedAt: Date;
  lastPosition: number;
  duration: number;
  played: boolean;
}
