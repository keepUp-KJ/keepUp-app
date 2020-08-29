import React from "react";
import { View, StyleSheet, Text } from "react-native";

class ForgotPasswordScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Forgot password</Text>
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

export default ForgotPasswordScreen;
