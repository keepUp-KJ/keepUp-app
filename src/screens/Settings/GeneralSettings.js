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
import Header from "../../components/Settings/Header";
import TextComp from "../../components/TextComp";
import { updateSettings } from "../../store/actions/users";
import TimePicker from "react-native-super-timepicker";
import WeekdayPicker from "../../components/Settings/WeekdayPicker";
import { scheduleNotifications } from "../../methods/notifications";
class GeneralSettings extends React.Component {
  state = {
    settings: {
      ...this.props.user.settings,
      general: this.props.user.settings.general,
    },
  };

  componentWillUnmount() {
    this.props.update(this.props.user, this.state.settings).then(() => {
      scheduleNotifications(this.state.settings);
    });
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
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.babyBlue }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <TimePicker
            ref={(ref) => {
              this.TimePicker = ref;
            }}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          />
          <Header color={Colors.babyBlue} title="General" />
          <ScrollView style={{ marginVertical: 10, flex: 0.7 }}>
            {/* Reminder at */}
            <TouchableOpacity
              style={styles.container}
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
              />
            </View>
            {/* Monthly Reminder */}
            <View style={{ margin: 20 }}>
              <TextComp style={{ color: Colors.secondary, fontSize: 20 }}>
                Monthly Reminder
              </TextComp>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  update: updateSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
