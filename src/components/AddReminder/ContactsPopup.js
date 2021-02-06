import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Input from "../Input";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";

const ContactsPopup = (props) => {
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState([]);

  const renderContact = (itemData) => (
    <TouchableOpacity
      onPress={() => {
        !props.pickedContacts.find(
          (contact) => contact.info.id === itemData.item.info.id
        )
          ? props.addContact(itemData.item)
          : props.removeContact(itemData.item);
      }}
      style={{
        ...styles.container,
        backgroundColor: props.pickedContacts.find(
          (contact) => contact.info.id === itemData.item.info.id
        )
          ? Colors.primaryColor
          : "rgb(248, 249, 253)",
        borderBottomColor: props.pickedContacts.find(
          (contact) => contact.info.id === itemData.item.info.id
        )
          ? "white"
          : "#e6e6e6",
      }}
    >
      <TextComp
        style={{
          color: props.pickedContacts.find(
            (contact) => contact.info.id === itemData.item.info.id
          )
            ? "white"
            : "black",
        }}
      >
        {itemData.item.info.name.replace(RegExp(input, "g"), input)}
      </TextComp>
    </TouchableOpacity>
  );
  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        props.close();
      }}
    >
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <TextComp
          style={{ alignSelf: "center", fontSize: 20, marginVertical: 10 }}
        >
          Add Contacts
        </TextComp>
        <Input
          onBlur={() => {
            Keyboard.dismiss();
          }}
          placeholder="Search..."
          value={input}
          onChangeText={(text) => {
            const updatedContacts = props.contacts.filter((contact) => {
              const name = String.prototype.toUpperCase.call(
                (contact.info.firstName || "") +
                  " " +
                  (contact.info.lastName || "")
              );

              const search = String.prototype.toUpperCase.call(text);
              return name.indexOf(search) > -1;
            });

            setInput(text);
            setContacts(updatedContacts);
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginLeft: 10 }}
          data={input ? contacts : null}
          keyExtractor={(item) => item.info.id}
          renderItem={renderContact}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").height / 2.2,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
  },
  container: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});

export default ContactsPopup;
