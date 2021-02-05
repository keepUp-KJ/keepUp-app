import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../../components/TextComp";
import { Fragment } from "react";
import { getSettings, updateSettings } from "../../store/actions/settings";
import TimePicker from "react-native-super-timepicker";
import WeekdayPicker from "../../components/Settings/WeekdayPicker";
class GeneralSettings extends React.Component {
  state = {
    time: "17:00",
    weeklyReminder: "Sunday",
    monthlyReminder: "15",
    days: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 0: 1 },
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

  onCancel = () => {
    this.TimePicker.close();
  };

  onConfirm = (hour, minute) => {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  };

  handleChange = (days) => {
    this.setState(days);
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.babyBlue }} />
        <SafeAreaView style={styles.screen}>
          <TimePicker
            ref={(ref) => {
              this.TimePicker = ref;
            }}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          />
          <View style={styles.header}>
            <View style={styles.backContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Settings");
                }}
              >
                <Ionicons name="md-arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <TextComp bold style={styles.text}>
                General
              </TextComp>
            </View>
          </View>
          <ScrollView style={styles.body}>
            {/* Reminder at */}
            <TouchableOpacity
              style={styles.settingContainer}
              activeOpacity={0.5}
              onPress={() => {
                this.TimePicker.open();
              }}
            >
              <TextComp style={{ color: Colors.secondary, fontSize: 20 }}>
                Reminder at:
              </TextComp>
              <TextComp style={{ color: Colors.secondary, fontSize: 18 }}>
                {this.state.time}
              </TextComp>
            </TouchableOpacity>
            {/* Weekly Reminder */}
            <View style={{ margin: 20 }}>
              <TextComp style={{ color: Colors.secondary, fontSize: 20 }}>
                Weekly Reminder
              </TextComp>
              <WeekdayPicker
                days={this.state.days}
                onChange={this.handleChange}
                style={styles.picker}
                dayStyle={styles.day}
              />
              {/* <DateTimePicker value={new Date()} mode="time" /> */}
            </View>
            {/* Monthly Reminder */}
            <View style={{ margin: 20 }}>
              <TextComp style={{ color: Colors.secondary, fontSize: 20 }}>
                Monthly Reminder
              </TextComp>
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
    backgroundColor: "white",
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
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
  picker: {
    paddingTop: 30,
  },
  day: {
    margin: 7,
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
