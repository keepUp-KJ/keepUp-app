import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import SettingsItem from "../components/SettingsItem";
import Btn from "../components/Btn";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getSettings, updateSettings } from "../store/actions/settings";
import { signout } from "../store/actions/users";

class SettingsScreen extends React.Component {
  state = {
    settings: {},
  };

  componentDidMount() {
    this.props.getSettings(this.props.user._id).then(() => {
      setTimeout(() => {
        this.setState({
          settings: {
            birthdayReminder: this.props.settings.birthdayReminder,
            callReminder: this.props.settings.callReminder,
            incompleteTaskReminder: this.props.settings.incompleteTaskReminder,
            birthdayNotification: this.props.settings.birthdayNotification,
            dailyCallNotification: this.props.settings.dailyCallNotification,
            incompleteTaskNotification: this.props.settings
              .incompleteTaskNotification,
          },
        });
      }, 200);
    });
  }

  componentWillUnmount() {
    console.log("Updated settings");
    this.props.updateSettings(this.props.user._id, this.state.settings);
  }

  render() {
    let options = [
      {
        label: "On the same day",
        value: "On the same day",
      },
      {
        label: "One day before",
        value: "One day before",
      },
      {
        label: "One week before",
        value: "One week before",
      },
      {
        label: "None",
        value: "None",
      },
    ];
    let incompleteOptions = [
      {
        label: "One day after",
        value: "One day after",
      },
      {
        label: "One week after",
        value: "One week after",
      },
      {
        label: "None",
        value: "None",
      },
    ];

    return (
      <SafeAreaView style={styles.screen}>
        {/* back arrow */}
        <View style={styles.top}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text}>SETTINGS</Text>
              </View>
            }
            leftComponent={
              <View>
                <Ionicons
                  name="md-arrow-back"
                  size={30}
                  color={Colors.secondary}
                  onPress={() => {
                    this.props.navigation.navigate("Home");
                  }}
                />
              </View>
            }
          />
        </View>
        <View style={{ ...styles.container, flex: 0.04 }}>
          <Text style={styles.headerText}>REMINDER</Text>
        </View>
        <View style={{ borderWidth: 0, marginBottom: 50, flex: 0.3 }}>
          <SettingsItem
            text="Birthday reminder"
            dropdown
            dropdownItems={options}
            zIndex={3}
            value={this.state.settings.birthdayReminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  birthdayReminder: item.value,
                },
              });
            }}
          />
          <SettingsItem
            text="Calls reminder"
            dropdown
            dropdownItems={options}
            zIndex={2}
            value={this.state.settings.callReminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  callReminder: item.value,
                },
              });
            }}
          />
          <SettingsItem
            text="Incomplete task reminder"
            dropdown
            dropdownItems={incompleteOptions}
            zIndex={1}
            value={this.state.settings.incompleteTaskReminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  incompleteTaskReminder: item.value,
                },
              });
            }}
          />
          <View style={{ ...styles.container, marginTop: 80 }}>
            <Text style={styles.headerText}>NOTIFICATIONS</Text>
          </View>
        </View>
        <View style={{ flex: 0.35, justifyContent: "center" }}>
          <SettingsItem
            text="Birthday Notifications"
            switch
            value={this.state.settings.birthdayNotification}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  birthdayNotification: !this.state.settings
                    .birthdayNotification,
                },
              });
            }}
          />
          <SettingsItem
            text="Daily calls Notifications"
            switch
            value={this.state.settings.dailyCallNotification}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  dailyCallNotification: !this.state.settings
                    .dailyCallNotification,
                },
              });
            }}
          />
          <SettingsItem
            text="Incomplete task Notifications"
            switch
            value={this.state.settings.incompleteTaskNotification}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  incompleteTaskNotification: !this.state.settings
                    .incompleteTaskNotification,
                },
              });
            }}
          />
        </View>

        <View style={styles.footerContainer}>
          <View style={{ width: "40%" }}>
            <Btn
              title="Sign out"
              btnColor={Colors.primaryColor}
              fontSize={16}
              loading={this.state.loading}
              textColor="white"
              onPress={() => {
                this.props.signout();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    flex: 0.1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  container: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    marginVertical: 20,
    padding: 10,
    zIndex: 0,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.primaryColor,
    fontFamily: "Futura",
  },
  text: {
    fontSize: 24,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Futura",
    color: "white",
    textAlign: "left",
    marginHorizontal: 15,
    fontWeight: "700",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.2,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  user: state.users.user,
});

const mapDispatchToProps = {
  getSettings,
  signout,
  updateSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
