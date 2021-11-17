import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../../theme/colors";

interface Props extends ViewProps {
  onRewind(): void;
  onPlayPause(): void;
  onNext(): void;
}

const PlaybackControls: FC<Props> = ({
  onRewind,
  onPlayPause,
  onNext,
  style,
}) => {
  return (
    <View
      style={StyleSheet.compose(
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        style
      )}
    >
      <TouchableOpacity
        onPress={onRewind}
        style={StyleSheet.compose(buttonStyle, { height: 40, width: 40 })}
      >
        <RewindBackIcon color={Color["black-100"]} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPlayPause}
        style={{
          ...buttonStyle,
          height: 47,
          width: 47,
          marginHorizontal: 28,
        }}
      >
        <MaterialCommunityIcons
          name="play"
          color={Color["black-100"]}
          size={46}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        style={{ ...buttonStyle, height: 40, width: 40 }}
      >
        <MaterialCommunityIcons
          name="skip-next"
          color={Color["black-100"]}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlaybackControls;

const buttonStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const RewindBackIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 20 25" fill="none">
    <Path
      d="M9.86054 4.1103V0.640531C9.86054 0.0808905 9.18897 -0.192712 8.80344 0.205255L4.09003 4.91867C3.8413 5.1674 3.8413 5.55293 4.09003 5.80166L8.80344 10.5151C9.18897 10.9006 9.86054 10.627 9.86054 10.0798V6.59759C14.4993 6.59759 18.1681 10.8509 17.1483 15.6638C16.5638 18.4868 14.2755 20.7627 11.4648 21.3472C7.02503 22.28 3.07024 19.233 2.47329 15.1166C2.39867 14.5196 1.87634 14.0595 1.25451 14.0595C0.508326 14.0595 -0.0886235 14.7186 0.0108681 15.4648C0.781928 20.9244 5.98037 24.9662 11.8628 23.8221C15.743 23.0635 18.8645 19.9419 19.6232 16.0617C20.8544 9.68184 16.0166 4.1103 9.86054 4.1103ZM8.49253 17.7904H7.43543V13.7361L6.17935 14.1217V13.2635L8.3806 12.48H8.49253V17.7904ZM13.8153 15.6016C13.8153 15.9996 13.778 16.3478 13.691 16.6214C13.6039 16.895 13.4795 17.1437 13.3303 17.3303C13.1811 17.5168 12.9821 17.6536 12.7707 17.7407C12.5593 17.8277 12.3105 17.865 12.0369 17.865C11.7633 17.865 11.527 17.8277 11.3032 17.7407C11.0793 17.6536 10.8928 17.5168 10.7311 17.3303C10.5694 17.1437 10.4451 16.9074 10.358 16.6214C10.2709 16.3353 10.2212 15.9996 10.2212 15.6016V14.6813C10.2212 14.2833 10.2585 13.9351 10.3456 13.6615C10.4326 13.3879 10.557 13.1392 10.7062 12.9526C10.8555 12.7661 11.0544 12.6293 11.2659 12.5422C11.4773 12.4552 11.726 12.4179 11.9996 12.4179C12.2732 12.4179 12.5095 12.4552 12.7334 12.5422C12.9572 12.6293 13.1438 12.7661 13.3054 12.9526C13.4671 13.1392 13.5915 13.3755 13.6785 13.6615C13.7656 13.9475 13.8153 14.2833 13.8153 14.6813V15.6016ZM12.7582 14.5321C12.7582 14.2958 12.7458 14.0968 12.7085 13.9351C12.6712 13.7734 12.6214 13.6491 12.5593 13.5496C12.4971 13.4501 12.4225 13.3755 12.323 13.3382C12.2235 13.3008 12.124 13.276 12.012 13.276C11.9001 13.276 11.7882 13.3008 11.7011 13.3382C11.6141 13.3755 11.527 13.4501 11.4648 13.5496C11.4027 13.6491 11.3529 13.7734 11.3156 13.9351C11.2783 14.0968 11.2659 14.2958 11.2659 14.5321V15.7384C11.2659 15.9747 11.2783 16.1737 11.3156 16.3353C11.3529 16.497 11.4027 16.6338 11.4648 16.7333C11.527 16.8328 11.6016 16.9074 11.7011 16.9447C11.8006 16.982 11.9001 17.0069 12.012 17.0069C12.124 17.0069 12.2359 16.982 12.323 16.9447C12.41 16.9074 12.4971 16.8328 12.5593 16.7333C12.6214 16.6338 12.6712 16.497 12.6961 16.3353C12.7209 16.1737 12.7458 15.9747 12.7458 15.7384V14.5321H12.7582Z"
      fill={color}
    />
  </Svg>
);
