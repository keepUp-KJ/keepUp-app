import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  const [borderColor, setBorderColor] = useState(Colors.secondary);
  const [borderWidth, setBorderWidth] = useState(0.5);
  return (
    <View>
      <Text
        style={{
          paddingLeft: 10,
          fontSize: 14,
          fontFamily: "Futura",
          color: "grey",
        }}
      >
        {props.title}
      </Text>
      <TextInput
        {...props}
        onFocus={() => {
          setBorderColor(Colors.primaryColor);
          setBorderWidth(2);
        }}
        onBlur={() => {
          setBorderColor(Colors.secondary);
          setBorderWidth(0.5);
        }}
        style={{
          ...styles.input,
          borderWidth,
          borderColor: props.error ? "#990000" : borderColor,
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
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    fontFamily: "Futura",
  },
  errorText: {
    paddingHorizontal: 12,
    color: "#990000",
    fontFamily: "Futura",
    fontSize: 10,
  },
});

export default Input;
