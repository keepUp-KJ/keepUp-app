import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 10 }}>{props.leftComponent}</View>
      <View
        style={{
          marginLeft: props.rightComponent ? 10 : 0,
          marginRight: props.leftComponent ? 10 : 0,
        }}
      >
        {props.centerComponent}
      </View>
      <View style={{ marginRight: 10 }}>{props.rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default Header;
