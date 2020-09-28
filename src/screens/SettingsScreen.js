import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import SettingsItem from "../components/SettingsItem";
import Btn from "../components/Btn";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getSettings } from "../store/actions/settings";

class SettingsScreen extends React.Component {
  state = {
    settings: [],
  };

  componentDidMount() {
    this.props.get().then(() => {
      this.setState({
        settings: this.props.settings,
      });
    });
  }

  render() {
    let options = [
      {
        label: "On the same day",
        value: "On the same day",
      },
      {
        label: "1 day before",
        value: "1 day before",
      },
      {
        label: "1 week before",
        value: "3",
      },
      {
        label: "None",
        value: "4",
      },
    ];
    let incompleteOptions = [
      {
        label: "1 day after",
        value: "1",
      },
      {
        label: "1 week after",
        value: "2",
      },
      {
        label: "None",
        value: "3",
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
            value={this.state.settings.birthday_reminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  birthday_notif: item.value,
                },
              });
            }}
          />
          <SettingsItem
            text="Calls reminder"
            dropdown
            dropdownItems={options}
            zIndex={2}
            value={this.state.settings.calls_reminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  daily_call_notif: item.value,
                },
              });
            }}
          />
          <SettingsItem
            text="Incomplete task reminder"
            dropdown
            dropdownItems={incompleteOptions}
            zIndex={1}
            value={this.state.settings.incomplete_task_reminder}
            onChangeItem={(item) => {
              this.setState({
                settings: {
                  incomplete_task_reminder: item.value,
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
            value={this.state.settings.birthday_notif}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  birthday_notif: !this.state.settings.birthday_notif,
                },
              });
            }}
          />
          <SettingsItem
            text="Daily calls Notifications"
            switch
            value={this.state.settings.daily_call_notif}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  daily_call_notif: !this.state.settings.daily_call_notif,
                },
              });
            }}
          />
          <SettingsItem
            text="Incomplete task Notifications"
            switch
            value={this.state.settings.incomplete_task_notif}
            onValueChange={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  incomplete_task_notif: !this.state.settings
                    .incomplete_task_notif,
                },
              });
            }}
          />
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={{ width: "40%" }}>
            <Btn
              title="Sign out"
              btnColor={Colors.primaryColor}
              fontSize={16}
              loading={this.state.loading}
              textColor="white"
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
});

const mapDispatchToProps = {
  get: getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
