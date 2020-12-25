import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import TextComp from "../TextComp";

const RejectedContact = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <View style={styles.circle}>
          <MaterialIcons name="person" size={40} color="white" />
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
        <TextComp style={styles.text} bold>
          {props.contact.firstName + " " + props.contact.lastName}
        </TextComp>
      </View>
      <TouchableOpacity
        style={{ flex: 0.3, alignItems: "flex-end" }}
        onPress={props.onPress}
      >
        <TextComp style={{ ...styles.text, color: "#990000" }} bold>
          Unreject
        </TextComp>
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
