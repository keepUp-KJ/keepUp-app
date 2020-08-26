import React from "react";
import { View, StyleSheet, Text } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
