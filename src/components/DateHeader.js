import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "./TextComp";
import { Calendar } from "react-native-event-week";
import Colors from "../constants/Colors";
import moment from "moment";

const DateHeader = (props) => {
  const today = moment().format("MMM DD, YYYY");

  return (
    <>
      <View style={{ ...styles.head, flex: 0.15 }}>
        <TextComp style={styles.date}>{today}</TextComp>
        <TextComp bold style={styles.today}>
          Today
        </TextComp>
      </View>
      <View style={{ flex: 0.12 }}>
        <Calendar
          events={[]}
          height={100}
          showTime={false}
          swipeEnabled={false}
          style={{ alignSelf: "center", marginLeft: -50 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    color: Colors.secondary,
  },
  head: {
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  today: {
    fontSize: 35,
  },
});

export default DateHeader;
