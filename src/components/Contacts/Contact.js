import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

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
              ? Colors.babyBlue
              : Colors.primaryColor
            : "rgb(248, 249, 253)",
      }}
      activeOpacity={0.6}
      onPress={() => {
        props.contact.accepted === false
          ? props.addContact()
          : props.removeContact();
      }}
    >
      <TextComp
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
      </TextComp>
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
    fontSize: 14,
    paddingHorizontal: 5,
  },
});

export default Contact;
