import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Input from "../Input";
import TextComp from "../TextComp";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactsPopup = (props) => {
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState([]);
  const [added, setAdded] = useState(false);
  const [activeContact, setActiveContact] = useState({});

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
          renderItem={(itemData) => (
            <View style={styles.container}>
              <TextComp>
                {itemData.item.info.name.replace(RegExp(input, "g"), input)}
              </TextComp>
              <TouchableOpacity
                onPress={() => {
                  props.addContact(itemData.item, itemData.index);
                  setActiveContact(itemData.item);
                  setAdded(!added);
                }}
              >
                {added && itemData.item === activeContact ? (
                  <AntDesign
                    name="minus"
                    size={25}
                    color={Colors.primaryColor}
                  />
                ) : (
                  <Ionicons
                    name="ios-add"
                    size={25}
                    color={Colors.primaryColor}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
  },
  container: {
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ContactsPopup;
