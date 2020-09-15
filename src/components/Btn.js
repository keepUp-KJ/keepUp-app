import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

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
        <Text
          style={{
            color: props.textColor,
            fontSize: props.fontSize,
            fontWeight: props.bold ? "800" : "400",
            marginLeft: 5,
            fontFamily: "Futura",
          }}
        >
          {props.title}
        </Text>
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
