import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import TextComp from "./TextComp";

const Btn = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...props.style,
        ...styles.container,
        backgroundColor: props.btnColor,
      }}
      onPress={props.onPress}
    >
      {props.icon}
      {props.loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <TextComp
          bold={props.bold}
          style={{
            color: props.textColor || "white",
            fontSize: props.fontSize,
            marginLeft: 5,
          }}
        >
          {props.title}
        </TextComp>
      )}
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
