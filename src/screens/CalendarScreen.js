import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import MainCalendar from "../components/MainCalendar";

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
          <Header
            centerComponent={<Text style={styles.text}>CALENDAR</Text>}
            leftComponent={
              <Ionicons
                name="md-arrow-back"
                size={30}
                color={Colors.secondary}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
            }
          />
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
          <View style={{ marginTop: 15 }}>
            <Text style={styles.date}>{this.state.date.toString()}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  text: {
    fontSize: 24,
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
