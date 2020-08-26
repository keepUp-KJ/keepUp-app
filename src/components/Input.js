import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return <TextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 20,
    padding: 10,
    marginVertical: 7,
  },
});

export default Input;
