import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { setupAccount, getReminders } from "../../store/actions/reminders";
import { getContactDecisions } from "../../store/actions/contacts";
import Colors from "../../constants/Colors";

class SetupScreen extends React.Component {
  componentDidMount() {
    this.props
      .setup(
        this.props.contacts.filter(
          (contact) => contact.isAccepted || contact.isRejected
        ),
        this.props.user._id
      )
      .then(() => {
        this.props
          .getReminders(this.props.user._id, this.props.user.token)
          .then(() => {
            if (this.props.reminders) {
              this.props
                .getContacts(this.props.user._id, this.props.user.token)
                .then(() => {
                  if (this.props.accepted) {
                    this.props.navigation.navigate("Home");
                  }
                });
            }
          });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text style={styles.text}>Setting Up {"\n"} Your Account</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  accepted: state.contacts.acceptedContacts,
  reminders: state.reminders.reminders,
});

const mapDispatchToProps = {
  setup: setupAccount,
  getReminders,
  getContacts: getContactDecisions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
