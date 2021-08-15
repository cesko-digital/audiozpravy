import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import Search from "../components/search";
import MainButton from "../components/buttons/main-button";
import Heading from "../components/typography/heading";
import Title from "../components/typography/title";
import CategoryButton from "../components/buttons/category-button";
import Tab from "../components/buttons/navigation/tab";
import Category from "../components/category";

const categories = [
  { id: 1, name: "Koronavirus", active: true },
  { id: 2, name: "Petr Kellner", active: false },
  { id: 3, name: "SK Slavia", active: false },
  { id: 4, name: "Miloš Zeman", active: true },
  { id: 5, name: "Volby 2021", active: false },
  { id: 6, name: "Vakcíny", active: false },
];
const Categories = [
  { id: 1, name: "Zprávy z domova", active: true },
  { id: 2, name: "Ekonomika", active: false },
  { id: 3, name: "Zprávy ze světa", active: false },
  { id: 4, name: "Zdraví", active: true },
  { id: 5, name: "Zvířata", active: false },
  { id: 6, name: "Lifestyle", active: false },
  { id: 7, name: "Komentáře", active: false },
  { id: 8, name: "Sport", active: false },
  { id: 9, name: "Hobby", active: true },
  { id: 10, name: "Hobby", active: false },
];

const CategoriesScreen = ({ navigation }) => {
  const [active, setActive] = useState([1, 4, 8]);

  return (
    <View style={styles.container}>
      <Heading>Kategorie</Heading>
      <Text style={styles.subtitle}>Hledáš něco konkrétního?</Text>
      <Search style={styles.searchArea} />
      <Title>Populární témata</Title>
      <View style={styles.sectionBtn}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onPress={() => {
              if (active.includes(category.id)) {
                const item = active.filter((item) => item !== category.id);
                setActive(item);
              } else {
                setActive((array) => [...array, category.id]);
              }
              console.log(active);
            }}
            active={active.includes(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </View>
      <Title size={2}>Všechny kategorie</Title>
      <View style={styles.sectionCat}>
        {Categories.map((Cat) => (
          <Category title={Cat.name} key={Cat.id}></Category>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 14,
    fontFamily: "RobotoBold",
  },
  searchArea: {
    marginBottom: 50,
  },
  sectionBtn: {
    marginTop: 10,
    marginBottom: 45,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  sectionCat: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
export default CategoriesScreen;
