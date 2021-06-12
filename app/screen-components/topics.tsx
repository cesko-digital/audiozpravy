import React, {useState} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Heading from "../components/typography/heading";
import CategoryButton from "../components/typography/category-button.tsx";

import { FontAwesome5 } from "@expo/vector-icons";
import Color from "../shared/colors";

const TopicsScreen = ({ navigation }) => {
  const [isActive, setActive] = useState(false); // state
  
  const categories = [
    {id: 1, name: 'Ekonomika'}, 
    {id: 2, name: 'Zprávy z domova'}, 
    {id: 3, name: 'Zprávy ze světa'}, 
    {id: 4, name: 'Sport'}, 
    {id: 5, name: 'Kultura'}, 
    {id: 6, name: 'Technologie'}, 
    {id: 7, name: 'Regiony'}, 
    {id: 8, name: 'Zdraví'}, 
    {id: 9, name: 'Koronavirus'},
    {id: 10, name: 'Volby do parlamentu'},
    {id: 11, name: 'Bitcoin'}, 
    {id: 12, name: 'Myanmar'}, 
    {id: 13, name: 'Vakcíny'}, 
    {id: 14, name: 'Bělorusko'}, 
    {id: 15, name: 'Regiony'}
  ];
  
  const categoryBtn = categories.map((category) =>  
      <TouchableHighlight
            onHideUnderlay={() => {
              this.setActive({ isActive: false });
            }}
            onShowUnderlay={() => {
              this.setActive({ isActive: true });
            }}>
        <CategoryButton
          key={category.id}
          onPress={choiceCategories}
        >{category.name}</CategoryButton>
     </TouchableHighlight>
      );


  let favouriteCategories = []; // není funkční
  const choiceCategories = (event) => {
    favouriteCategories.push(event.target.id);
   
    console.log(favouriteCategories);
  }

  return (
    <>
      <View style={ styles.container } >
        <FontAwesome5 name="long-arrow-alt-left" size={16} color="#0D0B12" />
        <Heading style={ styles.title }>Co vás zajímá?</Heading>
        <Text
          style={ styles.subtitle }> 
          Vyberte alespoň tři témata
        </Text>
        <Text style={ styles.text }
        >
          Aplikace se automaticky učí, co se Vám líbí. 
          Naučené volby můžete upravit v nastavení.
        </Text>
        <View style={ styles.sectionBtn }>
          {categoryBtn}
        </View>
        <Button 
          title="Poslechnout si výběr"
          color="#0D0B12"
          onPress={() => navigation.navigate(Screens.categories)}
        ></Button>
      </View>

    </>
)
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 24,
    paddingRight: 24
  },
  arrow: {
    width: 16,
    height: 8,
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
  },
  subtitle: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    marginBottom: 24,
  },
  sectionBtn: {
    margin: 10,
    marginBottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start'
  },
  activeButton: {
    borderColor: Color["blue"],
    backgroundColor: Color["blue"],
    color: "#fff"
  },
  blackButton: {
    borderRadius: 40,
    backgroundColor: Color["black-100"]
  }
})  

export default TopicsScreen;
