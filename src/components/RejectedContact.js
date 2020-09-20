import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const RejectedContact = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <View style={styles.circle}>
          <MaterialIcons name="person" size={40} color="white" />
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
        <Text style={styles.text}>{props.contact.name}</Text>
      </View>
      <TouchableOpacity
        style={{ flex: 0.3, alignItems: "flex-end" }}
        onPress={props.onPress}
      >
        <Text style={{ ...styles.text, color: "#990000" }}>Unreject</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6",
    width: "100%",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontFamily: "Futura",
    fontWeight: "700",
    color: Colors.secondary,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RejectedContact;
