import React, {useState} from "react";
import { Screens } from "../screens";
import { StyleSheet, View, Text, Button } from "react-native";

import Heading from "../components/typography/heading";
import Description from "../components/typography/description";
import MainButton from "../components/buttons/main-button"
import CategoryButton from "../components/buttons/category-button.tsx";

import { FontAwesome5 } from "@expo/vector-icons";
import Color from "../shared/colors";

const TopicsScreen = ({ navigation }) => {
  const [active, setActive]  = useState([1, 4, 8]);
  
  const categories = [
    {id: 1, name: "Ekonomika", active: true}, 
    {id: 2, name: "Zprávy z domova", active: false}, 
    {id: 3, name: "Zprávy ze světa", active: false}, 
    {id: 4, name: "Sport", active: true}, 
    {id: 5, name: "Kultura", active: false}, 
    {id: 6, name: "Technologie", active: false}, 
    {id: 7, name: "Regiony", active: false}, 
    {id: 8, name: "Zdraví", active: true}, 
    {id: 9, name: "Koronavirus", active: false},
    {id: 10, name: "Volby do parlamentu", active: false},
    {id: 11, name: "Bitcoin", active: false}, 
    {id: 12, name: "Myanmar", active: false}, 
    {id: 13, name: "Vakcíny", active: false}, 
    {id: 14, name: "Bělorusko", active: false}, 
    {id: 15, name: "Regiony", active: false}
  ];  

  return (
    <>
      <View style={ styles.container } >
        <FontAwesome5 
          name="long-arrow-alt-left" 
          size={16} 
          color="#0D0B12"
          onPress={() => {navigation.navigate(Screens.onboarding)} }
        /> 
        <Heading style={ styles.title }>Co vás zajímá?</Heading>
        <Text
          style={ styles.subtitle }> 
          Vyberte alespoň tři témata
        </Text>
        <Description style={{fontSize: 16, marginBottom: 24}}
        >
          Aplikace se automaticky učí, co se Vám líbí. 
          Naučené volby můžete upravit v nastavení.
        </Description>
        <View style={ styles.sectionBtn }>
          {categories.map((category) => 
            <CategoryButton
              key={category.id}
              onPress={() => {
                if (active.includes(category.id)) {
                  const item = active.filter((item) =>
                  item !== category.id);
                  setActive(item);
                }  else {
                  setActive((array) => [...array, category.id]);
                }
                console.log(active);
              }}
              active = {active.includes(category.id)}
              >{category.name}
            </CategoryButton>
          )}
        </View>
          <MainButton 
            onPress={() => {navigation.navigate(Screens.home)} }
          >Poslechnout si výběr</MainButton>        
      </View>
    </>
)}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "RobotoBold"
  },
  sectionBtn: {
    marginBottom: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
})  

export default TopicsScreen;
