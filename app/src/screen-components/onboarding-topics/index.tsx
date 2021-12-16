import React, { useState } from "react"
import { Screens } from "../../screens"
import { StyleSheet, View, Text, Button } from "react-native"

import Heading from "../../components/typography/heading"
import Description from "../../components/typography/description"
import MainButton from "../../components/buttons/main-button"
import CategoryButton from "../../components/buttons/category-button"

import { FontAwesome5 } from "@expo/vector-icons"
import categories from "../../shared/categories"
import { setPreferredTopics } from "../../securePreferences";

const minialTopicsCount = 3

const TopicsScreen = ({ navigation }) => {
  const [active, setActive] = useState(['kultura', 'sport', 'zdravi'])

  const onSubmit = () => {
    if (active.length >= minialTopicsCount) {
      setPreferredTopics(active).then(() => {
        // send preferred topics to BE
        navigation.navigate(Screens.home)
      })
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="long-arrow-alt-left"
        size={16}
        color="#0D0B12"
        onPress={() => {
          navigation.navigate(Screens.onboarding)
        }}
      />
      <Heading>Co vás zajímá?</Heading>
      <Text style={styles.subtitle}>Vyberte alespoň tři témata</Text>
      <Description style={{ fontSize: 16, marginBottom: 24 }}>
        Aplikace se automaticky učí, co se Vám líbí. Naučené volby můžete
        upravit v nastavení.
      </Description>
      <View style={styles.sectionBtn}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onPress={() => {
              if (active.includes(category.key)) {
                const item = active.filter((item) => item !== category.key)
                setActive(item)
              } else {
                setActive((array) => [...array, category.key])
              }
              console.log(active)
            }}
            active={active.includes(category.key)}
          >
            {category.title}
          </CategoryButton>
        ))}
      </View>
      <MainButton
        isEnabled={active.length >= 3}
        onPress={onSubmit}>
        Poslechnout si výběr
      </MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "white"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "RobotoBold",
  },
  sectionBtn: {
    marginBottom: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
})

export default TopicsScreen
