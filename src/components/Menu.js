import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Menu = (props) => {
  const STATUS = ["Accepted", "Pending", "Rejected"];

  return (
    <View style={styles.container}>
      {STATUS.map((item) => (
        <View key={item} style={styles.menuItem}>
          <Text
            style={{
              ...styles.text,
              textDecorationLine: props.active === item ? "underline" : null,
              fontWeight: props.active === item ? "700" : null,
            }}
            onPress={() => {
              props.onChange(item);
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.14,
    backgroundColor: Colors.primaryColor,
    marginBottom: -40,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItem: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderColor: "white",
    borderRightWidth: 1,
  },
  text: {
    fontFamily: "Futura",
    color: "white",
  },
});

export default Menu;
