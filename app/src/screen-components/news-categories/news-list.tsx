import React, { FC } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Asset from "../../theme/images"
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    id: 4,
    title: 'Zprávy',
    colors: ['#231557', '#44107A', '#FF1361'],
    image: Asset.category_zpravy
  },
  {
    id: 1,
    title: 'Sport',
    colors: ['#16A085', '#F4D03F'],
    image: Asset.category_sport
  },
  {
    id: 2,
    title: '5minutovka na míru',
    colors: ['#FF5858', '#F09819']
  },
  {
    id: 3,
    title: 'Finance',
    colors: ['#0C3483', '#6B8CCE'],
    image: Asset.category_finance
  },
  {
    id: 5,
    title: 'Zprávy',
    colors: ['#231557', '#44107A', '#FF1361'],
    image: Asset.category_zpravy
  },
  {
    id: 6,
    title: 'Sport',
    colors: ['#16A085', '#F4D03F'],
    image: Asset.category_sport
  },
  {
    id: 7,
    title: '5minutovka na míru',
    colors: ['#FF5858', '#F09819']
  },
  {
    id: 8,
    title: 'Finance',
    colors: ['#0C3483', '#6B8CCE'],
    image: Asset.category_finance
  },
];

interface Props {
  id: string;
  title: string;
  gradientColors: string[];
  image: ImageSourcePropType;
}

const GradientCard: FC<Props> = ({ id, title, gradientColors, image }) => {
  const navigation = useNavigation();

  return (
    <View
    style={{
      paddingTop: 12,
      paddingBottom: 12,
      paddingStart: 16,
      paddingEnd: 16,
    }}>

      <TouchableOpacity
        style={{}}
        onPress={() => {
          alert('playlist added to queue')
        }}
      >
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 20 }}>
          {(image != null) &&
            <Image source={image} style={{ width: '100%', height: 124, position: 'absolute', opacity: 0.25 }} />
          }
          <View style={{ height: 124, justifyContent: 'center', flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingStart: 16 }}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 30
                }}
              >
                <MaterialCommunityIcons name="play" color="black" size={24} />
              </View>

              
              <Text
                key={'category-title-' + id}
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  //fontFamily: 'Roboto',
                  color: '#fff',
                  paddingStart: 8,
                  // paddingTop: 45
                }}>
                {title}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const Item = ({ id, title, colors, image }) => (
  <View style={{}}>
    <GradientCard id={id} gradientColors={colors} title={title} image={image} />
  </View>
);

const NewsNavList = ({ topic }) => {
  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.title} colors={item.colors} image={item.image} />
  );
  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)
      
      }
      style={{}}
    />
  );
};

export default NewsNavList;
