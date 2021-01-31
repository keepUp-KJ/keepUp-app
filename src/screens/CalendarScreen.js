import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import moment from "moment";
import MainCalendar from "../components/MainCalendar";
import TabNav from "../components/Tab/TabNav";
import { connect } from "react-redux";
import Task from "../components/Task";
import TextComp from "../components/TextComp";
import { getReminders } from "../store/actions/reminders";

class CalendarScreen extends React.Component {
  state = {
    date: moment().format("MMM DD, YYYY"),
    markedDates: {},
  };

  getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      color: Colors.primaryColor,
      textColor: "black",
    };
    let serviceDate = moment(date);
    this.setState({
      date: serviceDate,
      markedDates,
    });
  };

  componentDidMount() {
    this.props.get(this.props.user._id, this.props.user.token);
  }

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
          <View style={styles.calendar}>
            {/* CALENDAR */}
            <MainCalendar
              dates={this.state.markedDates}
              onDayPress={(day) => {
                const date = new Date(day.dateString);
                date.getMonth();
                this.getSelectedDayEvents(day.dateString);
                this.setState({
                  date:
                    new Intl.DateTimeFormat("en-US", { month: "short" }).format(
                      date
                    ) +
                    " " +
                    ("0" + day.day).slice(-2) +
                    ", " +
                    day.year,
                });
              }}
            />
          </View>
          <View style={styles.list}>
            <TextComp style={styles.date}>
              {this.state.date.toString()}
            </TextComp>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.reminders.filter(
                (reminder) => reminder.date === this.state.date.toString()
              )}
              renderItem={(itemData) => <Task reminder={itemData.item} />}
              keyExtractor={(item) => item.contacts[0].info.id}
            />
          </View>
        </View>
        <TabNav active="calendar" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  list: { flex: 1 },
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
});

const mapDispatchToProps = {
  get: getReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
