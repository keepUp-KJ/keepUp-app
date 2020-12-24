import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import moment from "moment";
import MainCalendar from "../components/MainCalendar";
import TabNav from "../components/TabNav";
import { connect } from "react-redux";
import Task from "../components/Task";

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

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <Header leftComponent={<Text style={styles.title}>Calendar</Text>} />
        </View>
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
                  day.day +
                  ", " +
                  day.year,
              });
            }}
          />
        </View>
        <View style={{ flex: 0.45 }}>
          <Text style={styles.date}>{this.state.date.toString()}</Text>
          <FlatList
            data={this.props.reminders.filter(
              (reminder) => reminder.date === this.state.date.toString()
            )}
            renderItem={(itemData) => <Task reminder={itemData.item} />}
            keyExtractor={(item) => item._id || item.contacts[0].id}
          />
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
  calendar: {
    flex: 0.4,
  },
  title: {
    fontSize: 30,
    fontFamily: "Futura",
  },
  date: {
    fontSize: 20,
    fontFamily: "Futura",
    marginHorizontal: 30,
  },
});

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(mapStateToProps)(CalendarScreen);
