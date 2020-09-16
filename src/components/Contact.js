import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Contact = (props) => {
  const [contactPressed, setContactPressed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      disabled={contactPressed || accepted || rejected}
      onPress={() => {
        setContactPressed(true);
      }}
    >
      <Text style={styles.text}>{props.contact.name}</Text>

      <Ionicons
        style={{ position: "absolute" }}
        name={
          accepted
            ? "ios-checkmark-circle"
            : rejected
            ? "ios-close-circle"
            : null
        }
        size={70}
        color={accepted ? Colors.primaryColor : rejected ? "#990000" : null}
      />

      {contactPressed ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="ios-checkmark-circle"
            size={50}
            color={Colors.primaryColor}
            onPress={() => {
              props.onAccept();
              setAccepted(true);
              setContactPressed(false);
            }}
          />
          <Ionicons
            name="ios-close-circle"
            size={50}
            color="#990000"
            style={{ marginLeft: 5 }}
            onPress={() => {
              props.onReject();
              setRejected(true);
              setContactPressed(false);
            }}
          />
        </View>
      ) : null}
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
    backgroundColor: "#C3C4C4",
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
