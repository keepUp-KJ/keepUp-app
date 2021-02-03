import React, { Fragment } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "../../components/Settings/SettingsItem";
import TextComp from "../../components/TextComp";
import { getSettings, updateSettings } from "../../store/actions/settings";

class NotificationsScreen extends React.Component {
  state = {
    settings: {
      monthlyCallNotification: true,
      weeklyCallNotification: true,
      dailyCallNotification: false,
      incompleteTaskNotification: true,
      birthdayReminder: null,
      callReminder: null,
      incompleteTaskReminder: null,
    },
  };

  // componentDidMount() {
  //   this.props.get(this.props.user._id, this.props.user.token).then(() => {
  //     setTimeout(() => {
  //       this.setState({
  //         settings: {
  //           birthdayNotification: this.props.settings.birthdayNotification,
  //           dailyCallNotification: this.props.settings.dailyCallNotification,
  //           incompleteTaskNotification: this.props.settings
  //             .incompleteTaskNotification,
  //           birthdayReminder: this.props.settings.birthdayReminder,
  //           callReminder: this.props.settings.callReminder,
  //           incompleteTaskReminder: this.props.settings.incompleteTaskReminder,
  //         },
  //       });
  //     }, 500);
  //   });
  // }

  componentWillUnmount() {
    this.props.update(
      this.props.user._id,
      this.state.settings,
      this.props.user.token
    );
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ backgroundColor: Colors.blue }} />
        <SafeAreaView style={styles.screen}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
              style={styles.backContainer}
            >
              <Ionicons name="md-arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.container}>
              <TextComp bold style={styles.text}>
                Notifications
              </TextComp>
            </View>
          </View>

          <ScrollView style={styles.body}>
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
              title="Weekly calls"
              switch
              text="A notification will be sent for contacts you wish to contact weekly"
              value={this.state.settings.weeklyCallNotification}
              onValueChange={(weeklyCallNotification) => {
                this.setState({
                  settings: { ...this.state.settings, weeklyCallNotification },
                });
              }}
            />
            <SettingsItem
              titleColor={Colors.blue}
              title="Monthly calls"
              switch
              text="A notification will be sent for contacts you wish to contact monthly"
              value={this.state.settings.monthlyCallNotification}
              onValueChange={(monthlyCallNotification) => {
                this.setState({
                  settings: { ...this.state.settings, monthlyCallNotification },
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
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  backContainer: {
    marginHorizontal: 20,
    marginTop: 5,
    justifyContent: "center",
    width: "5%",
  },
  header: {
    flex: 0.25,
    backgroundColor: Colors.blue,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: "flex-end",
    flexDirection: "row",
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
