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
    settings: {
      general: {},
    },
    monthlyReminder: "15",
  };

  componentDidMount() {
    this.props.get(this.props.user._id, this.props.user.token).then(() => {
      this.setState({
        settings: {
          ...this.props.settings,
          general: this.props.settings.general,
        },
      });
    });
  }

  componentWillUnmount() {
    this.props.update(
      this.props.user._id,
      this.state.settings,
      this.props.user.token
    );
  }

  onCancel = () => {
    this.TimePicker.close();
  };

  onConfirm = (hour, minute) => {
    this.setState({
      settings: {
        ...this.state.settings,
        general: {
          ...this.state.settings.general,
          reminderAt: `${hour}:${minute}`,
        },
      },
    });
    this.TimePicker.close();
  };

  handleChange = (day) => {
    this.setState({
      settings: {
        ...this.state.settings,
        general: {
          ...this.state.settings.general,
          weeklyReminder: day,
        },
      },
    });
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
                {this.state.settings.general.reminderAt}
              </TextComp>
            </TouchableOpacity>
            {/* Weekly Reminder */}
            <View style={{ margin: 20 }}>
              <TextComp style={{ color: Colors.secondary, fontSize: 20 }}>
                Weekly Reminder
              </TextComp>
              <WeekdayPicker
                pickedDay={this.state.settings.general.weeklyReminder}
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
    margin: 6,
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
