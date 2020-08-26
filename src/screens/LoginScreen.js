import React from "react";
import { View, StyleSheet, Text } from "react-native";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Login Screen</Text>
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

export default LoginScreen;
