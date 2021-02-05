import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../TextComp";
import Header from "../Header";

const CalendarHeader = (props) => {
  return (
    <View style={styles.header}>
      <Header
        leftComponent={
          <TextComp bold style={styles.title}>
            Calendar
          </TextComp>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.07,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default CalendarHeader;
