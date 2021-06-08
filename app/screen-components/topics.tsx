import React from "react";
import { View, Image, Text, Button } from "react-native";
import Heading from "../components/typography/heading";


const fullCategories = [ 'Ekonomika', 'Zprávy z domova', 'Zprávy ze světa', 'Sport', 'Kultura', 'Technologie', 'Regiony', 'Zdraví', 'Koronavirus',
  'Volby do parlamentu', 'Bitcoin', 'Myanmar', 'Vakcíny', 'Bělorusko', 'Regiony'];

let buttonListArr = [];

const TopicsScreen = ({ navigation }) => {

  return (
    <>
      <View
        style={{
          paddingTop: 32,
          paddingLeft: 24
        }}
      >
        <Image src="../assets/arrow-long.svg"
            style={{
              
              left: '83.33%',
              right: '-50%',
              top: '66.67%',
              bottom: '0%'
            }}></Image>
        <Heading
          style={{
            fontSize: 32
          }}
        >Co vás zajímá?</Heading>
        <Text
          style={{
            fontSize: 18
          }}
        >
          Vyberte alespoň tři témata
        </Text>
        <Text>
          Aplikace se automaticky učí, co se Vám líbí. 
          Naučené volby můžete upravit v nastavení.
        </Text>
        <View>
          {buttonListArr = fullCategories.map(category => {
            <Button 
              title={category}
              style={{
                backgroundColor: '#1745C0',
                color: '#fff',
                fontSize: 14,
                lineHeight: 20,
                paddingTop: 8,
                paddingLeft: 16,
                borderRadius: 40
              }}
              key={category.id}
            >
            {category}
            </Button>
          })}
          
        </View>
        <Button 
          title="Poslechnout si výběr"
          onPress={() => navigation.navigate(Screens.categories)}
        />
      </View>
      

    </>


  );
};

export default TopicsScreen;
