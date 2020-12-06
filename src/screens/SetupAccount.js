import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { generateReminders } from "../store/actions/reminders";

class SetupAccount extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.props.generate(this.props.contacts).then(() => {
      this.setState({ loading: false });
      this.props.navigation.navigate("Home");
    });
  }

  render() {
    return this.props.loading ? (
      <View style={styles.screen}>
        <Image
          source={require("../../assets/giphy-2.gif")}
          style={{ width: 200, height: 200, backgroundColor: "white" }}
        />
        <Text style={styles.text}>Setting Up Your Account</Text>
      </View>
    ) : null;
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

const mapStateToProps = (state) => ({
  contacts: state.contacts.acceptedContacts,
});

const mapDispatchToProps = {
  generate: generateReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupAccount);
