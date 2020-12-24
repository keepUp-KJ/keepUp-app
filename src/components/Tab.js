import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Tab = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={props.onPress}
    >
      {!props.center ? (
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name={props.iconName}
            size={25}
            color={props.active ? Colors.primaryColor : Colors.secondary}
          />
          {Dimensions.get("window").height > 670 ? (
            <Text
              style={{
                ...styles.text,
                color: props.active ? Colors.primaryColor : Colors.secondary,
              }}
            >
              {props.text}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={styles.circle}>
          {/* <View style={styles.smallCircle}> */}
          <Ionicons name={props.iconName} size={50} color="white" />
          {/* </View> */}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  smallCircle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryColor,
  },
  circle: {
    backgroundColor: Colors.primaryColor,
    marginTop: -50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 80,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
  },
  text: {
    fontFamily: "Futura",
  },
});

export default Tab;
