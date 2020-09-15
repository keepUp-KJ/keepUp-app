import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const RadioButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={props.onPress}
        activeOpacity={0.9}
      >
        {props.checked ? <View style={styles.checked} /> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
  },
});

export default RadioButton;