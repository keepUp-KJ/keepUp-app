import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

class SettingsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Settings</Text>
      </SafeAreaView>
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

export default SettingsScreen;
