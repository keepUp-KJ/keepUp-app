import React from "react";
import { View, StyleSheet } from "react-native";
import Day from "./Day";

WeekdayPicker.defaultProps = {
  onChange: null,
  style: null,
  dayStyle: null,
  days: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 0: 1 },
};

export default function WeekdayPicker(props) {
  let { onChange, style, dayStyle, days } = props;
  /**
   * Function for toggling the day
   *
   * @param {String} day - Day of the week in one or two letters. e.g. M, Tu, W
   */
  const toggleDay = (day) => {
    Object.keys(days).forEach((d) => {
      days[d] = 0;
    });
    // If the day is 0 set it 1, if 1 set 0
    days[day] ? (days[day] = 0) : (days[day] = 1);
    // Call the parent function to set the new reminder in the state
    onChange(days);
  };

  // Populate days of the week
  let daysContainer = [];

  Object.keys(days).forEach((day, i) => {
    daysContainer.push(
      <Day
        key={i}
        toggleDay={toggleDay}
        day={day}
        style={[styles.day, dayStyle]}
        activeTextColor="38dfe1"
        isActive={1 === days[day]} // Pass boolean
      />
    );
  });
  return <View style={[styles.container, style]}>{daysContainer}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    height: 50,
    alignItems: "center",
  },
  day: {
    margin: 3,
  },
});
