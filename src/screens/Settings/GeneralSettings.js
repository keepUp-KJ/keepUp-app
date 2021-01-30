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
import DateTimePicker from "@react-native-community/datetimepicker";

class GeneralSettings extends React.Component {
  state = {
    settings: {
      monthlyCallNotification: null,
      weeklyCallNotification: null,
      dailyCallNotification: null,
      incompleteTaskNotification: null,
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

  // componentWillUnmount() {
  //   this.props.update(
  //     this.props.user._id,
  //     this.state.settings,
  //     this.props.user.token
  //   );
  // }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.babyBlue }} />
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
                General
              </TextComp>
            </View>
          </View>
          <ScrollView style={styles.body}>
            <View style={styles.settingContainer}>
              <TextComp style={{ color: Colors.babyBlue, fontSize: 22 }}>
                Reminder at:
              </TextComp>
              <TextComp style={{ color: Colors.secondary, fontSize: 18 }}>
                5:00 PM
              </TextComp>
              {/* <DateTimePicker value={new Date()} mode="time" /> */}
            </View>
            <View style={styles.settingContainer}>
              <TextComp style={{ color: Colors.babyBlue, fontSize: 22 }}>
                Weekly Reminder on:
              </TextComp>
              <TextComp style={{ color: Colors.secondary, fontSize: 18 }}>
                Sunday
              </TextComp>
              {/* <DateTimePicker value={new Date()} mode="time" /> */}
            </View>
            <View style={styles.settingContainer}>
              <TextComp style={{ color: Colors.babyBlue, fontSize: 22 }}>
                Monthly Reminder on day:
              </TextComp>
              <TextComp style={{ color: Colors.secondary, fontSize: 18 }}>
                15
              </TextComp>
              {/* <DateTimePicker value={new Date()} mode="time" /> */}
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
    flex: 0.25,
    backgroundColor: Colors.babyBlue,
  },
  settingContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
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
