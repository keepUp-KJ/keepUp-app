import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const Task = (props) => {
  return (
    <TouchableOpacity style={styles.task} onPress={props.completeTask}>
      <TextComp
        bold
        style={{
          ...styles.occasion,
          color: props.reminder.completed ? "white" : Colors.secondary,
        }}
      >
        {" "}
        {props.reminder.occasion
          ? props.reminder.occasion.toUpperCase()
          : "CALL"}
      </TextComp>
      {props.reminder.contacts.length > 2 ? (
        <View>
          <TextComp
            style={{
              ...styles.taskText,
              color: props.reminder.completed ? "white" : Colors.secondary,
            }}
          >
            {props.reminder.contacts[0].info.firstName}{" "}
            {props.reminder.contacts[0].info.lastName},{" "}
            {props.reminder.contacts[1].info.firstName}{" "}
            {props.reminder.contacts[1].info.lastName} {"+ "}
            {props.reminder.contacts.length - 2}
          </TextComp>
        </View>
      ) : (
        props.reminder.contacts.map((contact) => (
          <View key={contact.info.id} style={styles.container}>
            <View
              style={{
                borderWidth: 1,
                marginRight: 10,
                borderColor: props.reminder.completed
                  ? "white"
                  : Colors.secondary,
              }}
            />
            <TextComp
              style={{
                ...styles.taskText,
                color: props.reminder.completed ? "white" : Colors.secondary,
              }}
            >
              {contact.info.firstName} {contact.info.lastName}
            </TextComp>
          </View>
        ))
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    justifyContent: "space-between",
    padding: 25,
    borderRadius: 15,
    marginVertical: 3,
    backgroundColor: "rgb(248, 249, 253)",
  },
  taskText: {
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  occasion: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Task;
