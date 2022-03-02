import { Track } from "react-native-track-player";

export interface Article extends Track {
  img: string;
  published: Date;
}
