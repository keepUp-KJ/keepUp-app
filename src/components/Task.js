import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const Task = (props) => {
  return (
    <TouchableOpacity style={styles.task} onPress={props.completeTask}>
      <TextComp bold style={styles.occasion}>
        {" "}
        {props.reminder.occasion
          ? props.reminder.occasion.toUpperCase()
          : "CALL"}
      </TextComp>
      <View style={styles.container}>
        <TextComp style={styles.taskText}>
          {props.contact.info.firstName} {props.contact.info.lastName}
        </TextComp>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    justifyContent: "space-between",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
    marginVertical: 10,
  },
  taskText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  occasion: {
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondary,
  },
});

export default Task;
