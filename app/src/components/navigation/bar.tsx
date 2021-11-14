import React from "react";
import { View, useColorScheme } from "react-native";
import Tab from "./tab";

const Bar = ({ style, state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const barHiddenForCurrentTab = focusedOptions.tabBarVisible === false;

  if (barHiddenForCurrentTab) {
    return null;
  }

  return (
    <View
      style={[{
        flexDirection: "row",
        //height: 56,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        //shadowOpacity: 0.25,
        //shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "space-between",
      }, style]}
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
