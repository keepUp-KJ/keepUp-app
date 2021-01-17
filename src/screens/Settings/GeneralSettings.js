import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "../../components/Settings/SettingsItem";
import TextComp from "../../components/TextComp";
import { Fragment } from "react";
import { getSettings, updateSettings } from "../../store/actions/settings";

class GeneralSettings extends React.Component {
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
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.babyBlue }} />
        <SafeAreaView style={styles.screen}>
          <ScrollView style={{ flex: 1 }}>
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
                  General
                </TextComp>
              </View>
            </View>
            <View style={styles.body}>
              <View style={{ zIndex: 3 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={options}
                  titleColor={Colors.babyBlue}
                  title="Birthday reminder"
                  text="Reminder of your accepted contacts birthdays"
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
              </View>
              <View style={{ zIndex: 2 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={options}
                  titleColor={Colors.babyBlue}
                  title="Daily Calls reminder"
                  text="Reminder of your accepted contacts birthdays"
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
              </View>
              <View style={{ zIndex: 1 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={incompleteOptions}
                  titleColor={Colors.babyBlue}
                  title="Incomplete Task reminder"
                  text="Reminder of your accepted contacts birthdays"
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    backgroundColor: Colors.babyBlue,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
    height: 100,
  },
  text: {
    color: "white",
    fontSize: 35,
  },
  body: {
    marginVertical: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
