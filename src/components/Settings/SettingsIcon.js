import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import TextComp from "../TextComp";
import { Octicons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const SettingsIcon = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <View style={{ ...styles.icon, backgroundColor: props.color }}>
        {props.ionicons ? (
          <Ionicons name={props.iconName} size={30} color="white" />
        ) : (
          <Octicons name={props.iconName} size={30} color="white" />
        )}
      </View>
      <TextComp style={styles.iconText}>{props.title}</TextComp>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 20,
  },
  icon: {
    padding: 10,
    width: 50,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: Colors.primaryColor,
  },
  iconText: {
    fontSize: 16,
  },
});

export default SettingsIcon;
