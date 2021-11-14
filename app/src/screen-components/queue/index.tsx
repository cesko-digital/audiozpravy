import React from "react";
import { Text, View, StyleSheet, SectionList, TouchableOpacity, Image } from "react-native";
import Player from "../../components/player";
import Fonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import Color from "../../theme/colors";
import { AppStatusBar, useStatusBar } from "../../components/statusBar"
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DATA = [
  {
    title: "Přehráno",
    id: "played",
    data: [
      {
        id: 1,
        img: "https://placekitten.com/200/139",
        title: "Královská síla. Zázračný příběh Leicesteru, soupeře Slavie"
      }
    ]
  },
  {
    title: "Právě hraje",
    id: "playing",
    data: [
      {
        id: 2,
        img: "https://placekitten.com/200/139",
        title: "Jedna dávka vakcíny od Pfizeru nestačí. Aspoň na rok by nás měla ochránit, ..."
      }
    ]
  },
  {
    title: "Pokračuje",
    id: "next",
    data: [
      {
        id: 3,
        img: "https://placekitten.com/200/139",
        title: "Místo v Dubaji budeme prý lyžovat na jižním svahu v Chuchli, i v létě a ..."
      },
      {
        id: 4,
        img: "https://placekitten.com/200/139",
        title: "Nový šéf ÚOHS sliboval obnovu důvěry. Ve funkci nechává zástupkyni ..."
      }
    ]
  }
];

const Item = ({ item, isPlaying }) => {
  const theme = useTheme();
  const fonts = Fonts(theme);

  return (<View style={{ alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 8,
        paddingTop: 16,
        backgroundColor: isPlaying ? theme.colors.primary : "transparent"
      }}
    >
      <View style={{ width: 56, height: 42 }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10
          }}
          source={{
            uri: item.img,
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
            marginTop: -36,
            marginLeft: 12
          }}
        >
          <MaterialCommunityIcons name={isPlaying ? "pause" : "play"} color="white" size={24} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => alert("Chci prehrat zpravu!")}
        style={{
          flex: 1,
          marginStart: 16,
          marginEnd: 8
        }}
      >
        <View style={{}}>
          <Text
            style={StyleSheet.compose(fonts.titleSmall, { color: theme.colors.textInverse, lineHeight: 20 })}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 10,
              lineHeight: 16,
              color: Color["black-24"],
            }}
          >
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>)
};


const QueueScreen = ({ navigation }) => {
  const theme = useTheme();
  const fonts = Fonts(theme);
  useStatusBar('light-content');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundNegative
    },
    header: {
      ...fonts.textSmall,
      color: Color["black-8"],
      paddingStart: 16,
      paddingTop: 8,
      paddingBottom: 4
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.background,
      marginStart: 16,
      marginEnd: 16
    }
  });

  return (
    <View style={styles.container}>
      <AppStatusBar barStyle="light-content" backgroundColor={Color["black-88"]} />
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={DATA}
        ItemSeparatorComponent={
          ({ highlighted }) => (
            <View style={styles.separator}></View>
          )
        }
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item, section }) => <Item item={item} isPlaying={section.id == "playing"} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}:</Text>
        )}
      />

      <Player
        queue={[]}
        style={{ position: "absolute", bottom: 0 }}
        hideDescription
        hideQueue
      ></Player>
    </View>
    //</SafeAreaView>
  );
};

export default QueueScreen;
