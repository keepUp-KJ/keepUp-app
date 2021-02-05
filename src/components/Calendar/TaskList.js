import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Task from "../Task";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";

const TaskList = (props) => {
  return (
    <View style={styles.list}>
      <TextComp style={styles.date}>{props.date.toString()}</TextComp>
      {props.list
        .filter((reminder) => reminder.date === props.date.toString())
        .map((item, key) => (
          <Task key={key} reminder={item} completeTask={() => {}} />
        ))}
      {!props.list.find((reminder) => reminder.date === props.date) && (
        <TouchableOpacity style={styles.btn} onPress={props.addReminder}>
          <TextComp bold style={styles.text}>
            Add reminder
          </TextComp>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "white",
  },
  date: {
    fontSize: 20,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 10,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
});

export default TaskList;
