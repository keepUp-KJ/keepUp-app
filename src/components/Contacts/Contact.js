import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const Contact = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        backgroundColor: props.contact.isAccepted
          ? props.frequency === props.contact.frequency
            ? props.frequency === "weekly"
              ? Colors.blue
              : props.frequency === "monthly"
              ? Colors.babyBlue
              : Colors.primaryColor
            : "rgb(248, 249, 253)"
          : props.contact.isRejected
          ? Colors.tomato
          : "rgb(248, 249, 253)",
      }}
      activeOpacity={0.6}
      onPress={() => {
        props.contact.isAccepted === false && props.contact.isRejected === false
          ? props.addContact()
          : props.removeContact();
      }}
    >
      <TextComp
        style={{
          ...styles.text,
          color:
            (props.contact.isAccepted || props.contact.isRejected) &&
            props.frequency === props.contact.frequency
              ? "white"
              : Colors.secondary,
        }}
      >
        {props.contact.info.name}
      </TextComp>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
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
