import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const BirthdayReminder = (props) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
    >
      <View style={{ flex: 0.2, alignItems: "flex-start" }}>
        <Text
          style={{ ...styles.text, fontWeight: "700", textAlign: "center" }}
        >
          {props.date.toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 0.6, alignItems: "flex-start" }}>
        <Text style={styles.text}>{props.contact}</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <SimpleLineIcons name="options" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "Futura",
    color: "white",
  },
});

export default BirthdayReminder;
