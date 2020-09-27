import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { getReminders } from "../store/actions/reminders";

class SetupAccount extends React.Component {
  componentDidMount() {
    this.props.get().then(() => {
      this.props.navigation.navigate("Home");
    });
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

const mapDispatchToProps = {
  get: getReminders,
};

export default connect(null, mapDispatchToProps)(SetupAccount);
