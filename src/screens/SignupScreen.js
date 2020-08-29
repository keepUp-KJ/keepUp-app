import React from "react";
import { View, StyleSheet, Text } from "react-native";

class SignupScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Sign Up</Text>
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

export default SignupScreen;
