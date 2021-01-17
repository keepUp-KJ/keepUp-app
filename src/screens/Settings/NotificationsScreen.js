import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "../../components/Settings/SettingsItem";
import TextComp from "../../components/TextComp";
import { getSettings, updateSettings } from "../../store/actions/settings";

class NotificationsScreen extends React.Component {
  state = {
    settings: {
      birthdayNotification: null,
      dailyCallNotification: null,
      incompleteTaskNotification: null,
      birthdayReminder: null,
      callReminder: null,
      incompleteTaskReminder: null,
    },
  };

  componentDidMount() {
    this.props.get(this.props.user._id, this.props.user.token).then(() => {
      setTimeout(() => {
        this.setState({
          settings: {
            birthdayNotification: this.props.settings.birthdayNotification,
            dailyCallNotification: this.props.settings.dailyCallNotification,
            incompleteTaskNotification: this.props.settings
              .incompleteTaskNotification,
            birthdayReminder: this.props.settings.birthdayReminder,
            callReminder: this.props.settings.callReminder,
            incompleteTaskReminder: this.props.settings.incompleteTaskReminder,
          },
        });
      }, 500);
    });
  }

  componentWillUnmount() {
    this.props.update(
      this.props.user._id,
      this.state.settings,
      this.props.user.token
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
            style={{
              flex: 0.6,
              marginHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.container}>
            <TextComp bold style={styles.text}>
              Notifications
            </TextComp>
          </View>
        </View>
        <View style={styles.body}>
          <SettingsItem
            titleColor={Colors.blue}
            title="Birthdays"
            text="A notification will be sent for your contacts birthdays"
            switch
            value={this.state.settings.birthdayNotification}
            onValueChange={(birthdayNotification) => {
              this.setState({
                settings: { ...this.state.settings, birthdayNotification },
              });
            }}
          />
          <SettingsItem
            titleColor={Colors.blue}
            title="Daily calls"
            switch
            text="A notification will be sent for contacts you wish to contact daily"
            value={this.state.settings.dailyCallNotification}
            onValueChange={(dailyCallNotification) => {
              this.setState({
                settings: { ...this.state.settings, dailyCallNotification },
              });
            }}
          />
          <SettingsItem
            titleColor={Colors.blue}
            title="Incomplete task"
            switch
            text="A notification will be sent if you do not complete a task before its required time"
            value={this.state.settings.incompleteTaskNotification}
            onValueChange={(incompleteTaskNotification) => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  incompleteTaskNotification,
                },
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    backgroundColor: Colors.blue,
    marginTop: -50,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  settings: state.settings.settings,
});

const mapDispatchToProps = {
  get: getSettings,
  update: updateSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
