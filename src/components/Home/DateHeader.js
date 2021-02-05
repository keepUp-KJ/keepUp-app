import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../TextComp";
import { Calendar } from "react-native-event-week";
import Colors from "../../constants/Colors";
import moment from "moment";
import ReloadBtn from "../ReloadBtn";

const DateHeader = (props) => {
  const today = moment().format("MMM DD, YYYY");

  return (
    <>
      <View style={{ ...styles.head, flex: 0.15 }}>
        <View>
          <TextComp style={styles.date}>{today}</TextComp>
          <TextComp bold style={styles.today}>
            Today
          </TextComp>
        </View>
        <ReloadBtn />
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
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  today: {
    fontSize: 35,
  },
});

export default DateHeader;
