import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Settings/Header";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import SettingsItem from "../../components/Settings/SettingsItem";
import { updateSettings } from "../../store/actions/users";

class NotificationsScreen extends React.Component {
  state = {
    settings: {
      ...this.props.user.settings,
      notifications: this.props.user.settings.notifications,
    },
  };

  componentWillUnmount() {
    this.props.update(this.props.user, this.state.settings);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.blue }} />
        <SafeAreaView style={styles.screen}>
          <Header color={Colors.blue} title="Notifications" />
          <ScrollView style={styles.body}>
            <SettingsItem
              titleColor={Colors.blue}
              title="Daily calls"
              text="A notification will be sent for contacts you wish to contact daily"
              value={this.state.settings.notifications.dailyCalls}
              onValueChange={() => {
                this.setState({
                  settings: {
                    ...this.state.settings,
                    notifications: {
                      ...this.state.settings.notifications,
                      dailyCalls: !this.state.settings.notifications.dailyCalls,
                    },
                  },
                });
              }}
            />
            <SettingsItem
              titleColor={Colors.blue}
              title="Weekly calls"
              text="A notification will be sent for contacts you wish to contact weekly"
              value={this.state.settings.notifications.weeklyCalls}
              onValueChange={() => {
                this.setState({
                  settings: {
                    ...this.state.settings,
                    notifications: {
                      ...this.state.settings.notifications,
                      weeklyCalls: !this.state.settings.notifications
                        .weeklyCalls,
                    },
                  },
                });
              }}
            />
            <SettingsItem
              titleColor={Colors.blue}
              title="Monthly calls"
              text="A notification will be sent for contacts you wish to contact monthly"
              value={this.state.settings.notifications.monthlyCalls}
              onValueChange={() => {
                this.setState({
                  settings: {
                    ...this.state.settings,
                    notifications: {
                      ...this.state.settings.notifications,
                      monthlyCalls: !this.state.settings.notifications
                        .monthlyCalls,
                    },
                  },
                });
              }}
            />
            <SettingsItem
              titleColor={Colors.blue}
              title="Incomplete task"
              text="A notification will be sent if you do not complete a task before its required time"
              value={this.state.settings.notifications.incompleteTask}
              onValueChange={() => {
                this.setState({
                  settings: {
                    ...this.state.settings,
                    notifications: {
                      ...this.state.settings.notifications,
                      incompleteTask: !this.state.settings.notifications
                        .incompleteTask,
                    },
                  },
                });
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  update: updateSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
