import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View>
      <Text
        style={{
          paddingLeft: 10,
          fontSize: 14,
          fontFamily: "Futura",
        }}
      >
        {props.title}
      </Text>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          borderColor: props.error ? "#990000" : Colors.secondary,
        }}
      />
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    paddingHorizontal: 20,
    marginVertical: 2,
    fontFamily: "Futura",
  },
  errorText: {
    paddingHorizontal: 12,
    color: "#990000",
    fontFamily: "Futura",
    fontSize: 12,
  },
});

export default Input;
