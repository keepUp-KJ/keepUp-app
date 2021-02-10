import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";
import { Ionicons } from "@expo/vector-icons";

const Task = (props) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <TouchableOpacity
      style={styles.task}
      activeOpacity={props.reminder.occasion ? 0.9 : 0.5}
      onPress={() => {
        setImageVisible(!imageVisible);
      }}
    >
      <View style={styles.row}>
        <View>
          <TextComp bold style={styles.occasion}>
            {props.reminder.occasion
              ? props.reminder.occasion.toUpperCase()
              : "CALL"}
          </TextComp>
          <View style={styles.container}>
            {props.reminder.contacts.length > 2 ? (
              <>
                <TextComp style={styles.taskText}>
                  {props.reminder.contacts[0].info.name}
                  {", "}
                  {props.reminder.contacts[1].info.name} +
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
                  {contact.info.name}
                </TextComp>
              ))
            )}
          </View>
        </View>
        <View>
          {props.calendar && props.reminder.occasion && (
            <Ionicons
              name={!checked ? "ios-notifications" : "ios-notifications-off"}
              size={30}
              color={!checked ? Colors.secondary : Colors.tomato}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          )}
          {!props.calendar && (
            <Ionicons
              name={checked ? "ios-radio-button-on" : "ios-radio-button-off"}
              size={35}
              color={Colors.primaryColor}
              onPress={() => {
                setChecked(!checked);
                setTimeout(() => {
                  props.completeTask();
                }, 2000);
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 15,
    marginVertical: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: Colors.primaryColor,
  },
});

export default Task;
