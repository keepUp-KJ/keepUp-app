import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function Day(props) {
  let daysMapping = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  return (
    <TouchableOpacity
      style={[
        props.style,
        styles.default,
        props.isActive ? styles.active : styles.inactive,
      ]}
      onPress={() => props.toggleDay(props.day)}
    >
      <Text style={props.isActive ? styles.activeText : styles.inactiveText}>
        {daysMapping[props.day]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 37,
    width: 37,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: Colors.babyBlue,
  },
  inactive: {},
  activeText: {
    color: "#ffffff",
  },
  inactiveText: {
    color: "#d3d3d3",
  },
});
