import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { setupAccount } from "../store/actions/reminders";
import Colors from "../constants/Colors";

class SetupScreen extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.props
      .setup(
        this.props.contacts.filter((contact) => contact.accepted === true),
        this.props.user._id
      )
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false });
          this.props.navigation.navigate("Home");
        }, 2500);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {this.state.loading ? (
          <View>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <Text style={styles.text}>Setting Up {"\n"} Your Account</Text>
          </View>
        ) : null}
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
  text: {
    fontFamily: "Futura",
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = {
  setup: setupAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
