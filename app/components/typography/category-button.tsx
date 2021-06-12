import React from 'react'; 
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Color from "../../shared/colors";


const CategoryButton: FC = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      style={ styles.button }
      onPress={onPress}
    >
      <Text
        style={ styles.text }
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
  text: {
    fontSize: 14,
    color: Color["black-100"],
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16
  }
})

export default CategoryButton;
