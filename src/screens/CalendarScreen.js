import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import moment from "moment";
import MainCalendar from "../components/MainCalendar";
import TabNav from "../components/TabNav";

class CalendarScreen extends React.Component {
  state = {
    date: moment().format("DD MMMM YYYY"),
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
          <Header centerComponent={<Text style={styles.text}>CALENDAR</Text>} />
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
                  day.day +
                  " " +
                  new Intl.DateTimeFormat("en-US", {
                    month: "long",
                  }).format(date) +
                  " " +
                  day.year,
              });
            }}
          />

          {/* DATE */}
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.date}>{this.state.date.toString()}</Text>
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
    flex: 0.55,
  },
  text: {
    fontSize: 20,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
  date: {
    fontSize: 24,
    fontFamily: "Futura",
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default CalendarScreen;
