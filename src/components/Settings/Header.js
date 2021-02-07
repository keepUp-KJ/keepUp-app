import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../TextComp";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TextComp bold style={styles.text}>
        Settings
      </TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
  },
});

export default Header;
