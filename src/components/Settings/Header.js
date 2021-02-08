import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import TextComp from "../TextComp";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../../navigation/navigationRef";

const Header = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        flex: Dimensions.get("window").height < 700 ? 0.3 : 0.25,
      }}
    >
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate("Settings");
          }}
        >
          <Ionicons name="md-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextComp bold style={styles.text}>
          {props.title}
        </TextComp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    marginHorizontal: 15,
    marginTop: 25,
    width: "6%",
  },
  container: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 35,
  },
});

export default Header;
