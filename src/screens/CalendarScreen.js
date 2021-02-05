import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import moment from "moment";
import MainCalendar from "../components/MainCalendar";
import TabNav from "../components/Tab/TabNav";
import { connect } from "react-redux";
import Task from "../components/Task";
import TextComp from "../components/TextComp";
import { getReminders } from "../store/actions/reminders";
import { ScrollView } from "react-native-gesture-handler";

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

    // this.props.get(this.props.user._id, this.props.user.token).then(() => {
    let markedDates = {};

    markedDates[today] = { selected: true };

    console.log(this.props.reminders);

    this.props.reminders.forEach((reminder) => {
      let date = moment(reminder.date).format("YYYY-MM-DD");
      if (moment().isBefore(date)) {
        markedDates[date] = {
          marked: true,
        };
      }
    });

    this.setState({ reminderDates: markedDates, markedDates });
    // });
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

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <Header
            leftComponent={
              <TextComp bold style={styles.title}>
                Calendar
              </TextComp>
            }
          />
        </View>

        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.calendar}>
              {/* CALENDAR */}
              <MainCalendar
                dates={this.state.markedDates}
                onDayPress={(day) => {
                  const date = new Date(day.dateString);
                  date.getMonth();
                  this.getSelectedDayEvents(day.dateString);
                  this.setState({
                    date: moment(date).format("MMM DD, YYYY"),
                  });
                }}
              />
            </View>
            <View style={styles.list}>
              <TextComp style={styles.date}>
                {this.state.date.toString()}
              </TextComp>
              {this.props.reminders
                .filter(
                  (reminder) => reminder.date === this.state.date.toString()
                )
                .map((item, key) => (
                  <Task key={key} reminder={item} />
                ))}
            </View>
          </ScrollView>
        </View>
        <TabNav active="calendar" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flex: 0.07,
    justifyContent: "center",
  },
  body: {
    flex: 0.85,
  },
  calendar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
  },
  date: {
    fontSize: 20,
    marginHorizontal: 30,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.reminders,
  loading: state.reminders.loading,
});

const mapDispatchToProps = {
  get: getReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
