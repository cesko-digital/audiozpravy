import React from 'react'; 
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Color from '../../shared/colors';

// selectedCategories.includes(category.name) ? styles.activeButton : styles.button

const CategoryButton = ({ children, style, onPress, selectedCategories }) => {
  const activeStyle = selectedCategories === 'Regiony' ? styles.activeButton : styles.button;
  const activeStyleText = selectedCategories === 'Regiony' ? styles.activeText : styles.text;
  console.log(selectedCategories)
  return (
    
    <TouchableOpacity
      style={activeStyle}
      onPress={ onPress }
    >
      <Text
        style={activeStyleText}
      >{children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  button: {
    color: '#fff',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: Color["black-100"],
    display: 'flex',
    flexDirection: 'row',
    margin: 3
  },
  activeButton: {
    display: 'flex',
    flexDirection: 'row',
    margin: 3,
    borderRadius: 40,
    borderColor: Color["blue"],
    backgroundColor: Color["blue"],
    color: "#fff"
  },
  text: {
    fontSize: 14,
    fontFamily: 'RobotoLight',
    lineHeight: 20,
    color: Color["black-100"],
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  activeText: {
    fontSize: 14,
    fontFamily: 'RobotoLight',
    lineHeight: 20,
    color: '#fff',
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16
  }
})

export default CategoryButton;
