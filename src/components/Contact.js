import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Contact = (props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => {
        props.contact.accepted === false
          ? props.addContact()
          : props.removeContact();
      }}
    >
      <Text style={styles.text}>{props.contact.contact.name}</Text>
      <MaterialCommunityIcons
        style={{ position: "absolute" }}
        name={
          props.contact.accepted && props.frequency === props.contact.frequency
            ? "checkbox-blank-circle"
            : null
        }
        size={60}
        color="white"
      />
      <Ionicons
        style={{ position: "absolute" }}
        name={
          props.contact.accepted && props.frequency === props.contact.frequency
            ? "ios-checkmark-circle"
            : null
        }
        size={70}
        color={
          props.frequency === "weekly"
            ? "purple"
            : props.frequency === "monthly"
            ? "rgb(50,130,180)"
            : Colors.primaryColor
        }
      />
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
    backgroundColor: "#e6e6e6",
  },
  text: {
    textAlign: "center",
    fontFamily: "Futura",
    color: Colors.secondary,
    fontSize: 14,
    paddingHorizontal: 5,
  },
});

export default Contact;
