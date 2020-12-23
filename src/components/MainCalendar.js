import React from "react";
import { Calendar } from "react-native-calendars";
import Colors from "../constants/Colors";

const MainCalendar = (props) => {
  return (
    <Calendar
      enableSwipeMonths={true}
      onDayPress={(day) => {
        props.onDayPress(day);
      }}
      hideArrows={true}
      theme={{
        selectedDayBackgroundColor: Colors.primaryColor,
        todayTextColor: Colors.primaryColor,
        dotColor: Colors.primaryColor,
        selectedDotColor: Colors.primaryColor,
        indicatorColor: Colors.primaryColor,
        textDayFontFamily: "Futura",
        textMonthFontFamily: "Futura",
        textDayHeaderFontFamily: "Futura",
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
      markedDates={props.dates}
    />
  );
};

export default MainCalendar;
