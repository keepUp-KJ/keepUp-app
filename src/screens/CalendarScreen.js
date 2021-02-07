import React from "react";
import { View, SafeAreaView, BackHandler, ScrollView } from "react-native";
import moment from "moment";

// Components
import CalendarHeader from "../components/Calendar/CalendarHeader";
import MainCalendar from "../components/Calendar/MainCalendar";
import TaskList from "../components/Calendar/TaskList";
import TabNav from "../components/Tab/TabNav";

console.disableYellowBox = true;
class CalendarScreen extends React.Component {
  state = {
    date: moment(this.props.navigation.getParam("date")).format("MMM DD, YYYY"),
    reminderDate: null,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
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
              date={this.props.navigation.getParam("date")}
              setDate={(date) => {
                this.setState({ date });
              }}
            />
            <TaskList
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

export default CalendarScreen;
