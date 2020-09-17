import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

class SetupAccount extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 5000);
  }

  render() {
    return (
      <View style={styles.screen}>
        <Image
          source={require("../../assets/giphy-2.gif")}
          style={{ width: 200, height: 200, backgroundColor: "white" }}
        />
        <Text style={styles.text}>Setting Up Your Account</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "rgb(237, 240, 241)",
  },
  text: {
    fontFamily: "Futura",
    fontSize: 25,
    textAlign: "center",
  },
});

export default SetupAccount;
