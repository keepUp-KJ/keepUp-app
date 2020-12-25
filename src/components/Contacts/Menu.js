import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Menu = (props) => {
  const STATUS = ["Accepted", "Pending", "Rejected"];

  return (
    <View style={styles.container}>
      {STATUS.map((item) => (
        <View
          key={item}
          style={{
            ...styles.menuItem,
            borderBottomWidth: props.active === item ? 3 : 0,
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontWeight: props.active === item ? "700" : null,
            }}
            onPress={() => {
              props.onChange(item);
            }}
          >
            {item.toUpperCase()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  menuItem: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: Colors.secondary,
    borderBottomColor: Colors.primaryColor,
  },
  text: {
    fontFamily: "Futura",
    color: Colors.secondary,
    fontSize: 13,
  },
});

export default Menu;
