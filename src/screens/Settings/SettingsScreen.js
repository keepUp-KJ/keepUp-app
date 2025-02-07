import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import SettingsItem from "../../components/Settings/SettingsItem";
import { connect } from "react-redux";
import { getSettings, updateSettings } from "../../store/actions/settings";
import { signout } from "../../store/actions/users";
import TabNav from "../../components/Tab/TabNav";
import Btn from "../../components/Btn";
import TextComp from "../../components/TextComp";
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
              <TextComp bold style={styles.title}>
                Settings
              </TextComp>
            }
          />
        </View>
        <View style={{ ...styles.container, flex: 0.05 }}>
          <TextComp style={styles.headerText}>REMINDER</TextComp>
        </View>
        <View style={{ flex: 0.3 }}>
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
        </View>
        <View style={{ ...styles.container, flex: 0.05 }}>
          <TextComp style={styles.headerText}>NOTIFICATIONS</TextComp>
        </View>
        <View style={{ flex: 0.3 }}>
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
        <View style={{ flex: 0.15 }}>
          <Btn
            style={{ width: "60%", alignSelf: "center" }}
            title="Signout"
            btnColor={Colors.primaryColor}
            textColor="white"
            onPress={() => {
              this.props.signout();
            }}
          />
        </View>
        <TabNav active="settings" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    flex: 0.07,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    zIndex: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: "Futura",
    color: Colors.secondary,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    textAlign: "left",
    marginHorizontal: 15,
  },
});

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  user: state.users.user,
});

const mapDispatchToProps = {
  getSettings,
  updateSettings,
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
