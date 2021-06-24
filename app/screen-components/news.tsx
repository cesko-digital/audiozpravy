import React from "react";
import { Text, View } from "react-native";
import Player from "../components/player";
import { Record } from "../shared/types";

const mockQueue: Record[] = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Nullam eget nisl. Quisque tincidunt scelerisque libero. Fusce consectetuer risus a nunc. Pellentesque pretium lectus id turpis. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Phasellus rhoncus. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Quisque porta. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Aliquam ornare wisi eu metus. Nullam at arcu a est sollicitudin euismod. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Aenean fermentum risus id tortor. Nulla est. Aliquam id dolor. Donec vitae arcu.",
    duration: 253,
  },
  {
    description:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Proin in tellus sit amet nibh dignissim sagittis. Praesent vitae arcu tempor neque lacinia pretium. Aenean fermentum risus id tortor. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Vivamus luctus egestas leo. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Nunc auctor. Praesent in mauris eu tortor porttitor accumsan. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.",
    duration: 46,
  },
  {
    description:
      "Maecenas sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Etiam bibendum elit eget erat. Suspendisse nisl. Etiam egestas wisi a erat. Pellentesque arcu. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Etiam quis quam. Etiam neque. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Aliquam erat volutpat. Pellentesque sapien. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nulla non arcu lacinia neque faucibus fringilla.",
    duration: 120,
  },
];

const NewsScreen = ({ navigation }) => {
  return (
    <View style={{ position: "relative", height: "100%", width: "100%" }}>
      <Text>News</Text>
      <Player
        queue={mockQueue}
        style={{ position: "absolute", bottom: 0 }}
      ></Player>
    </View>
  );
};

export default NewsScreen;
