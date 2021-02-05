import React from "react";
import { View, SafeAreaView, BackHandler, ScrollView } from "react-native";

import moment from "moment";
import Colors from "../constants/Colors";

// Components
import CalendarHeader from "../components/Calendar/CalendarHeader";
import MainCalendar from "../components/Calendar/MainCalendar";
import TaskList from "../components/Calendar/TaskList";
import TabNav from "../components/Tab/TabNav";

//Redux
import { connect } from "react-redux";
import { getReminders } from "../store/actions/reminders";

const today = moment().format("YYYY-MM-DD");

class CalendarScreen extends React.Component {
  state = {
    date: moment().format("MMM DD, YYYY"),
    markedDates: {},
    reminderDates: {},
  };

  getSelectedDayEvents = (date) => {
    let markedDates = {
      ...this.state.reminderDates,
    };

    markedDates[today] = {
      selected: false,
    };

    const reminderDate = this.props.navigation.getParam("date");
    if (reminderDate) {
      markedDates[reminderDate] = {
        selected: false,
      };
    }

    markedDates[date] = {
      selected: true,
      color: Colors.primaryColor,
      textColor: "black",
    };
    let serviceDate = moment(date).format("MMM DD, YYYY");
    this.setState({
      date: serviceDate,
      markedDates,
    });
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    let markedDates = {};

    const date = this.props.navigation.getParam("date");
    if (date) {
      this.setState({ date: moment(date).format("MMM DD, YYYY") });
      markedDates[date] = { selected: true };
    } else {
      markedDates[today] = { selected: true };
    }

    this.props.reminders.forEach((reminder) => {
      let date = moment(reminder.date).format("YYYY-MM-DD");
      if (moment().isBefore(date)) {
        markedDates[date] = {
          marked: true,
        };
      }
    });

    this.setState({ reminderDates: markedDates, markedDates });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.navigate("Home");
    return true;
  };

  handleDayChange = (day) => {
    this.getSelectedDayEvents(day.dateString);
    this.setState({
      date: moment(day.dateString).format("MMM DD, YYYY"),
    });
  };

  addReminderHandler = () => {
    this.props.navigation.navigate("AddReminder", {
      date: moment(this.state.date).format("YYYY-MM-DD"),
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
        <CalendarHeader />
        <View style={{ flex: 0.85 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MainCalendar
              dates={this.state.markedDates}
              onDayPress={this.handleDayChange}
            />
            <TaskList
              list={this.props.reminders}
              date={this.state.date}
              addReminder={this.addReminderHandler}
            />
          </ScrollView>
        </View>
        <TabNav active="calendar" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.reminders,
  loading: state.reminders.loading,
});

const mapDispatchToProps = {
  get: getReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
