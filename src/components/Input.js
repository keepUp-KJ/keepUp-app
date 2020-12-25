import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const Input = (props) => {
  const [borderColor, setBorderColor] = useState(Colors.secondary);
  const [borderWidth, setBorderWidth] = useState(0.5);

  return (
    <View>
      <TextComp
        style={{
          paddingLeft: 10,
          fontSize: 14,
          color: "grey",
        }}
      >
        {props.title}
      </TextComp>
      <TextInput
        {...props}
        autoFocus={props.auto}
        blurOnSubmit={true}
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
      <TextComp style={styles.errorText}>{props.error}</TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    fontFamily: "regular",
  },
  errorText: {
    paddingHorizontal: 12,
    color: "#990000",
    fontSize: 10,
  },
});

export default Input;
