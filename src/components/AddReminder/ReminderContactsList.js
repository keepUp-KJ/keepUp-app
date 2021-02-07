import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";
import { Ionicons } from "@expo/vector-icons";

const ReminderContactsList = (props) => {
  const renderContact = (itemData) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.contactContainer,
          backgroundColor: itemData.index === 0 ? "white" : "#e6e6e6",
          borderWidth: itemData.index === 0 ? 1.5 : 1,
        }}
        onPress={() => {
          props.onOpen(itemData.index);
        }}
      >
        {itemData.index === 0 ? (
          <Ionicons name="ios-add" size={40} color="#e6e6e6" />
        ) : itemData.item.info.imageAvailable ? (
          <Image
            source={{ uri: itemData.item.info.image.uri }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <TextComp style={styles.contactText}>
            {itemData.item.info.firstName.charAt(0).toUpperCase() +
              (itemData.item.info.lastName
                ? itemData.item.info.lastName.charAt(0).toUpperCase()
                : "")}
          </TextComp>
        )}
      </TouchableOpacity>
    );
  };

  const sort = (contacts) => {
    contacts.sort((a, b) => {
      if (a > b) {
        return -1;
      }
    });
    contacts.unshift({});

    return contacts;
  };

  return (
    <FlatList
      style={{ zIndex: 1 }}
      ListHeaderComponent={
        <TextComp style={{ ...styles.text, marginVertical: 5 }}>
          Contacts
        </TextComp>
      }
      data={sort(props.data)}
      keyExtractor={(item) => item.firstName}
      numColumns={4}
      renderItem={renderContact}
    />
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: "#e6e6e6",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  contactText: {
    fontSize: 20,
    color: Colors.secondary,
  },
  text: {
    fontSize: 14,
    color: Colors.secondary,
  },
});

export default ReminderContactsList;
