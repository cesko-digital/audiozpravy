import React, { FC, useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import categories, { ArticleCategory } from '../../shared/categories'
import { useTheme } from "../../theme";
import useFonts from "../../theme/fonts";


interface GridProps {
  images: string[]
}

const ImageGrid: FC<GridProps> = ({ images }) => {
  const theme = useTheme();

  const imageOpacity = useRef(new Animated.Value(0)).current
  const [showImages, setShowImages] = useState(false)
  var loadingState = [false, false, false, false, false, false, false, false, false]

  useEffect(() => {
    if (showImages) {
      Animated.timing(imageOpacity, {
        duration: 300,
        toValue: 1,
        easing: Easing.cubic,
        useNativeDriver: false
      }).start();
    }
  }, [showImages])

  const onLoad = (index: number) => {
    return () => {
      loadingState[index] = true
      var isLoaded = loadingState.every(Boolean)
      if (isLoaded) {
        setShowImages(true)
      }
    }
  }

  const onError = (index: number) => {
    return (error) => {
      console.error(error)
    }
  }

  const style = StyleSheet.create({
    container: {
      width: 42,
      height: 30,
      borderRadius: 10,
      backgroundColor: theme.colors.skeletonLight,
      marginStart: 4,
    },
    image: {
      width: 42,
      height: 30,
      borderRadius: 10,
      position: 'absolute',
      resizeMode: 'contain'
    }
  })

  return (
    <View style={{ alignItems: 'flex-start', marginEnd: 24 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[0] }} onLoad={onLoad(0)} onError={onError(0)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[1] }} onLoad={onLoad(1)} onError={onError(1)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[2] }} onLoad={onLoad(2)} onError={onError(2)}></Animated.Image></View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[3] }} onLoad={onLoad(3)} onError={onError(3)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[4] }} onLoad={onLoad(4)} onError={onError(4)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[5] }} onLoad={onLoad(5)} onError={onError(5)}></Animated.Image></View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[6] }} onLoad={onLoad(6)} onError={onError(6)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[7] }} onLoad={onLoad(7)} onError={onError(7)}></Animated.Image></View>
        <View style={style.container}><Animated.Image style={[style.image, { opacity: imageOpacity }]} source={{ uri: images[8] }} onLoad={onLoad(8)} onError={onError(8)}></Animated.Image></View>
      </View>
    </View>
  )
}

interface Props {
  item: ArticleCategory
  weekNumber: number,
  images: string[]
}

const GradientCard: FC<Props> = ({ item, weekNumber, images }) => {
  const fonts = useFonts()
  const theme = useTheme();

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
        <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 20 }}>
          {(item.image != null) &&
            <Image source={item.image} style={{ width: '100%', height: 124, position: 'absolute', opacity: 0.25 }} />
          }
          <View style={{ height: (item.image != null) ? 124 : 74, justifyContent: 'center', flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 16 }}>

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

              <View style={{ alignItems: 'flex-start', marginStart: 8, flex: 1 }}>
                <Text
                  key={'category-title-' + item.id}
                  style={StyleSheet.compose(fonts.titleLarge, { color: theme.colors.textInverse })}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row', backgroundColor: item.colors[0], paddingHorizontal: 4, paddingVertical: 3 }}>
                  <FontAwesome5 name="clock" color='#FFF4B9' size={15} />
                  <Text style={StyleSheet.compose(fonts.titleXSmall, { marginStart: 4, color: '#FFF4B9' })}>{weekNumber != null ? weekNumber + '.týden' : 'DNES'}</Text>
                </View>
              </View>

              {(item.image != null) &&
                <ImageGrid images={images}></ImageGrid>
              }

            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const Item = ({ item, weekNumber, images }) => (
  <View style={{}}>
    <GradientCard item={item} weekNumber={weekNumber} images={images} />
  </View>
);

const NewsNavList = ({ topicID }) => {
  const renderItem = ({ item }) => {
    // sample data
    const weekNumber = (topicID == 'week') ? 59 : null
    const timestamp = topicID + item.key //Date.now()
    const sampleImages = [
      'http://lorempixel.com/126/90/?a' + timestamp,
      'http://lorempixel.com/126/90/?b' + timestamp,
      'http://lorempixel.com/126/90/?c' + timestamp,
      'http://lorempixel.com/126/90/?d' + timestamp,
      'http://lorempixel.com/126/90/?e' + timestamp,
      'http://lorempixel.com/126/90/?f' + timestamp,
      'http://lorempixel.com/126/90/?g' + timestamp,
      'http://lorempixel.com/126/90/?h' + timestamp,
      'http://lorempixel.com/126/90/?i' + timestamp
    ]
    return (<Item item={item} weekNumber={weekNumber} images={sampleImages} />)
  };
  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => String('topicID-' + item.id)
      }
      style={{}}
    />
  );
};

export default NewsNavList;
