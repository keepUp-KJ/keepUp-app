import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const Contact = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        backgroundColor:
          props.contact.accepted && props.frequency === props.contact.frequency
            ? props.frequency === "weekly"
              ? Colors.blue
              : props.frequency === "monthly"
              ? Colors.tomato
              : Colors.primaryColor
            : "#e6e6e6",
      }}
      activeOpacity={0.6}
      onPress={() => {
        props.contact.accepted === false
          ? props.addContact()
          : props.removeContact();
      }}
    >
      <Text
        style={{
          ...styles.text,
          color:
            props.contact.accepted &&
            props.frequency === props.contact.frequency
              ? "white"
              : Colors.secondary,
        }}
      >
        {props.contact.contact.name}
      </Text>
    </TouchableOpacity>
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
  },
  text: {
    textAlign: "center",
    fontFamily: "Futura",
    fontSize: 14,
    paddingHorizontal: 5,
  },
});

export default Contact;
