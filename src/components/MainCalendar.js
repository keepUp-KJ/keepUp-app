import React from "react";
import {} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Colors from "../constants/Colors";

const MainCalendar = (props) => {
  return (
    <Calendar
      enableSwipeMonths={true}
      onDayPress={(day) => {
        props.onDayPress(day);
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
      markedDates={props.dates}
    />
  );
};

export default MainCalendar;
