import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Menu = (props) => {
  const STATUS = ["Accepted", "Pending", "Rejected"];

  return (
    <View style={styles.container}>
      {STATUS.map((item) => (
        <View
          key={item}
          style={{
            ...styles.menuItem,
            borderRightWidth: item === "Rejected" ? 0 : 1,
          }}
        >
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
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  menuItem: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    borderColor: "white",
  },
  text: {
    fontFamily: "Futura",
    color: "white",
  },
});

export default Menu;
