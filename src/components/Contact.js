import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Contact = (props) => {
  return (
    <View style={styles.card}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Futura",
          color: Colors.secondary,
          fontSize: 11,
          paddingHorizontal: 5,
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#C3C4C4",
  },
});

export default Contact;
