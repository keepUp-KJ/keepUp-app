import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const IconButton = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={styles.circle}
        activeOpacity={0.7}
        onPress={props.onPress}
      >
        <View>{props.icon}</View>
      </TouchableOpacity>
      <TextComp style={styles.text}>{props.title}</TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: Colors.secondary,
  },
});

export default IconButton;
