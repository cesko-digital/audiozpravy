import { GradientCard, Props } from "@app/components/GradientCard";
import React, { FC } from "react";
import { ViewProps } from "react-native";
import { View } from "react-native";

interface ItemProps extends ViewProps, Props {}

const Item: FC<ItemProps> = ({ item, weekNumber, images, onPress }) => (
  <View style={{}}>
    <GradientCard
      item={item}
      weekNumber={weekNumber}
      images={images}
      onPress={onPress}
    />
  </View>
);

export default Item;
