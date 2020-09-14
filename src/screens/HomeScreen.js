import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
