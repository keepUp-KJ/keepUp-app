import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Switch,
  FlatList,
} from "react-native";
import Btn from "../components/Btn";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { addContactsToReminder } from "../store/actions/reminders";

class AddReminderScreen extends React.Component {
  render() {
    const CONTACTS = [];
    CONTACTS.unshift({});
    let dropdownItems = [
      {
        label: "On the same day",
        value: "1",
      },
      {
        label: "One day before",
        value: "2",
      },
      {
        label: "One week before",
        value: "3",
      },
      {
        label: "None",
        value: "4",
      },
    ];
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.header}>
            <Header
              leftComponent={
                <Ionicons
                  name="ios-arrow-back"
                  size={24}
                  color="grey"
                  style={{ marginLeft: 15 }}
                />
              }
              centerComponent={
                <Text style={styles.headerText}>New Reminder</Text>
              }
            />
          </View>
          <View style={styles.body}>
            <Input title="Event Title" placeholder="Add event title" />
            <Input title="Location" placeholder="Add location" />
            <View style={styles.container}>
              <Text style={styles.text}>Date</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ ...styles.text, color: "black" }}>
                  All day event
                </Text>
                <Switch style={{ marginLeft: 15 }} />
              </View>
            </View>
            <View style={{ flex: 0.6 }}></View>
            <DropDownPicker
              style={{ borderWidth: 0 }}
              items={dropdownItems}
              containerStyle={{
                ...styles.input,
                height: 45,
                marginVertical: 15,
              }}
              itemStyle={{ justifyContent: "flex-start" }}
              labelStyle={{ color: Colors.secondary, fontFamily: "Futura" }}
              dropDownStyle={{ marginTop: 5, marginLeft: 20 }}
              arrowSize={18}
              arrowStyle={{ alignSelf: "center" }}
            />
            <FlatList
              ListHeaderComponent={
                <Text style={{ ...styles.text, marginVertical: 5 }}>
                  Contacts
                </Text>
              }
              data={CONTACTS}
              renderItem={(itemData) => (
                <TouchableOpacity
                  style={{
                    ...styles.contactContainer,
                    backgroundColor: itemData.index === 0 ? "white" : "#e6e6e6",
                    borderWidth: itemData.index === 0 ? 1.5 : 1,
                  }}
                  onPress={() => {
                    itemData.index === 0 ? this.props.add() : null;
                  }}
                >
                  {itemData.index === 0 ? (
                    <Ionicons name="ios-add" size={40} color="#e6e6e6" />
                  ) : (
                    <Text style={styles.contactText}>
                      {itemData.item.firstName.charAt(0).toUpperCase() +
                        itemData.item.lastName.charAt(0).toUpperCase()}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.firstName}
              numColumns={4}
            />
          </View>
          <View style={styles.footer}>
            <Btn
              title="Create reminder"
              btnColor={Colors.primaryColor}
              style={{ width: "80%", alignSelf: "center" }}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Futura",
    fontWeight: "300",
  },
  text: {
    fontSize: 14,
    fontFamily: "Futura",
    fontWeight: "300",
    color: Colors.secondary,
  },
  contactText: {
    fontSize: 20,
    fontFamily: "Futura",
    color: Colors.secondary,
  },
  body: {
    flex: 0.8,
    marginHorizontal: 30,
  },
  container: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 12,
    padding: 2,
    borderColor: Colors.secondary,
  },
  contactContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: "#e6e6e6",
    borderStyle: "dashed",
  },
  footer: {
    flex: 0.1,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  add: addContactsToReminder,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderScreen);
