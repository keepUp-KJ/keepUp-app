import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Btn = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: props.btnColor }}
    >
      {props.icon}
      <Text
        style={{
          color: "white" || props.textColor,
          fontSize: props.fontSize,
          fontWeight: props.bold ? "800" : "400",
          marginLeft: 5,
          fontFamily: "Futura",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Btn;
