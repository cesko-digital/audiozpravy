import React from "react";
import { View } from "react-native";
import Tab from "./tab";

const Bar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const barHiddenForCurrentTab = focusedOptions.tabBarVisible === false;

  if (barHiddenForCurrentTab) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        height: 56,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "space-between",
      }}
    >
      {state.routes.map((route, index) => (
        <Tab
          route={route}
          options={descriptors[route.key].options}
          navigation={navigation}
          isFocused={state.index === index}
          key={route.name}
        />
      ))}
    </View>
  );
};

export default Bar;
