import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const Task = (props) => {
  const [imageVisible, setImageVisible] = useState(false);
  return (
    <TouchableOpacity
      style={styles.task}
      activeOpacity={props.reminder.occasion ? 0.9 : 0.5}
      onPress={() => {
        props.reminder.occasion
          ? setImageVisible(!imageVisible)
          : props.completeTask();
      }}
    >
      <TextComp bold style={styles.occasion}>
        {props.reminder.occasion
          ? props.reminder.occasion.toUpperCase()
          : "CALL"}
      </TextComp>
      <View style={styles.container}>
        {props.reminder.contacts.length > 2 ? (
          <>
            <TextComp style={styles.taskText}>
              {props.reminder.contacts[0].info.firstName}{" "}
              {props.reminder.contacts[0].info.lastName},{" "}
              {props.reminder.contacts[1].info.firstName}{" "}
              {props.reminder.contacts[1].info.lastName} {"+ "}
              {props.reminder.contacts.length - 2}
            </TextComp>
            {imageVisible && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {props.reminder.contacts
                  .sort((contact) => !contact.info.imageAvailable)
                  .map((contact, index) => (
                    <View key={index} style={styles.contactImages}>
                      {contact.info.imageAvailable ? (
                        <Image
                          source={{ uri: contact.info.image.uri }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <TextComp bold style={{ color: "white" }}>
                          {contact.info.firstName.charAt(0)}
                          {contact.info.lastName &&
                            contact.info.lastName.charAt(0)}
                        </TextComp>
                      )}
                    </View>
                  ))}
              </View>
            )}
          </>
        ) : (
          props.reminder.contacts.map((contact) => (
            <TextComp key={contact.info.id} style={styles.taskText}>
              {contact.info.firstName} {contact.info.lastName}
            </TextComp>
          ))
        )}
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
    marginVertical: 3,
    backgroundColor: "rgb(248, 249, 253)",
  },
  contactImages: {
    width: 30,
    height: 30,
    backgroundColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 5,
    marginRight: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  taskText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  container: {
    justifyContent: "center",
    marginVertical: 5,
  },
  occasion: {
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondary,
  },
});

export default Task;
