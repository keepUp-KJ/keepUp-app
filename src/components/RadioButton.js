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
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: Colors.primaryColor,
  },
});

export default RadioButton;
