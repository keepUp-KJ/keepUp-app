import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
class CalendarScreen extends React.Component {
  state = {
    date: new Date(),
  };
  render() {
    var today = moment().format("DD MMMM YYYY");

    return (
      <SafeAreaView style={styles.screen}>
        {/* Header */}
        <View style={styles.top}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text}>CALENDAR</Text>
              </View>
            }
            leftComponent={
              <View>
                <Ionicons
                  name="md-arrow-back"
                  size={30}
                  color={Colors.secondary}
                  onPress={() => {
                    this.props.navigation.navigate("Home");
                  }}
                />
              </View>
            }
          />
        </View>
        <View style={styles.calendar}>
          <Calendar
            enableSwipeMonths={true}
            onDayPress={(day) => {
              selected: true, console.log("selected day", day);
            }}
            style={{
              height: 350,
            }}
            theme={{
              calendarBackground: "#ededed",
              textSectionTitleColor: "black",
              selectedDayBackgroundColor: Colors.primaryColor,
              selectedDayTextColor: "black",
              todayTextColor: Colors.primaryColor,
              dayTextColor: "black",
              textDisabledColor: "#d9e1e8",
              dotColor: Colors.primaryColor,
              selectedDotColor: Colors.primaryColor,
              arrowColor: "black",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "black",
              indicatorColor: Colors.primaryColor,
              textDayFontFamily: "Futura",
              textMonthFontFamily: "Futura",
              textDayHeaderFontFamily: "Futura",
              textDayFontWeight: "300",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              day: {
                selected: true,
                marked: true,
              },
              "2020-09-17": { marked: true },
            }}
          />
        </View>
        <View style={styles.bottom}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text2}>{today}</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    flex: 0.1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  bottom: {
    flex: 0.1,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
  text2: {
    fontSize: 24,
    fontFamily: "Futura",
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "700",
  },
  calendar: {
    flex: 0.55,
  },
});
export default CalendarScreen;
