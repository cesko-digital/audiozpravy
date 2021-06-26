import React, {useState} from 'react';
import { Screens } from '../screens';
import { StyleSheet, View, Text, Button } from 'react-native';

import Heading from '../components/typography/heading';
import Description from '../components/typography/description';
import MainButton from '../components/buttons/main-button'
import CategoryButton from '../components/buttons/category-button.tsx';

import { FontAwesome5 } from '@expo/vector-icons';
import Color from '../shared/colors';

const TopicsScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories]  = useState([]); 
  
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
    <CategoryButton
      key={category.id}
      onPress={() => {
        if (selectedCategories.includes(category.name)) {
          selectedCategories.splice(selectedCategories.indexOf(category.name), 1);
        }  else {
          selectedCategories.push(category.name)
          setSelectedCategories(selectedCategories);
        }
        console.log(selectedCategories);
      }}
      selectedCategories = {selectedCategories}
    >{category.name}</CategoryButton>
  );

  return (
    <>
      <View style={ styles.container } >
        <FontAwesome5 name='long-arrow-alt-left' size={16} color='#0D0B12' /> 
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
          {categoryBtn}
        </View>
        <MainButton 
          onPress={() => {
            if (selectedCategories.length < 3) {
              console.log('Musíš vybrat alespoň tři kategorie')
            } else {
              navigation.navigate(Screens.categories)}}
          }  
        >Poslechnout si výběr</MainButton>
      </View>
    </>
)
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
  },
  subtitle: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'RobotoLight'
  },
  sectionBtn: {
    marginBottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start'
  }
})  


export default TopicsScreen;
