import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View>
      <Text style={{ paddingLeft: 10, fontSize: 14, fontFamily: "Futura" }}>
        {props.title}
      </Text>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          marginBottom: props.title ? 20 : 0,
          borderColor: props.error ? "#990000" : Colors.secondary,
        }}
      />
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    fontFamily: "Futura",
  },
  errorText: {
    paddingHorizontal: 12,
    color: "#990000",
    fontFamily: "Futura",
    fontSize: 12,
    marginTop: -15,
    marginBottom: 5,
  },
});

export default Input;
