import React from "react";
import { Calendar } from "react-native-calendars";
import Colors from "../../constants/Colors";

const ReminderCalendar = (props) => {
  return (
    <Calendar
      {...props}
      enableSwipeMonths={true}
      onDayPress={(day) => {
        props.onDayPress(day);
      }}
      current={props.date}
      style={{ marginBottom: 20 }}
      theme={{
        selectedDayBackgroundColor: Colors.primaryColor,
        todayTextColor: Colors.primaryColor,
        dotColor: Colors.primaryColor,
        selectedDotColor: Colors.primaryColor,
        indicatorColor: Colors.primaryColor,
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
      markedDates={props.dates}
    />
  );
};

export default ReminderCalendar;
