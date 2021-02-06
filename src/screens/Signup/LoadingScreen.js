import React from "react";
import { connect } from "react-redux";
import { tryLocalSignin } from "../../store/actions/users";
import {
  getContactDecisions,
  syncContacts,
} from "../../store/actions/contacts";
import { getReminders } from "../../store/actions/reminders";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../../components/TextComp";

class LoadingScreen extends React.Component {
  componentDidMount = () => {
    this.props.localSignin().then(() => {
      if (this.props.user) {
        this.props.sync().then((contacts) => {
          if (contacts) {
            this.props
              .getReminders(this.props.user._id, this.props.user.token)
              .then(() => {
                if (this.props.reminders) {
                  this.props
                    .getContacts(this.props.user._id, this.props.user.token)
                    .then(() => {
                      if (this.props.contacts) {
                        this.props.navigation.navigate("Home");
                      }
                    });
                }
              });
          }
        });
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <TextComp bold style={styles.title}>
          Keep Up
        </TextComp>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  title: {
    fontSize: 45,
    color: "white",
    marginBottom: 30,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.reminders,
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = {
  localSignin: tryLocalSignin,
  sync: syncContacts,
  getReminders,
  getContacts: getContactDecisions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
