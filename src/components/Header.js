import React from "react";
import { View, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 30 }}>{props.leftComponent}</View>
      <View
        style={{
          marginLeft: props.rightComponent ? 30 : 0,
          marginRight: props.leftComponent ? 30 : 0,
        }}
      >
        {props.centerComponent}
      </View>
      <View style={{ marginRight: 30 }}>{props.rightComponent}</View>
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
