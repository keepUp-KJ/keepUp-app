import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { setupAccount } from "../../store/actions/reminders";
import Colors from "../../constants/Colors";

class SetupScreen extends React.Component {
  componentDidMount() {
    this.props.setup(
      this.props.contacts.filter(
        (contact) => contact.isAccepted || contact.isRejected
      ),
      this.props.user._id
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {this.props.loading ? (
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
  loading: state.reminders.loading,
});

const mapDispatchToProps = {
  setup: setupAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
