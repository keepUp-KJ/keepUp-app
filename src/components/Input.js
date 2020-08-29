import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View>
      <Text style={{ paddingLeft: 10, fontSize: 14 }}>{props.title}</Text>
      <TextInput
        {...props}
        style={{ ...styles.input, marginBottom: props.title ? 20 : 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 25,
    padding: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
});

export default Input;
