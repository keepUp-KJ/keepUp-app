import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Btn from "../components/Btn";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { addContactsToReminder, addReminder } from "../store/actions/reminders";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextComp from "../components/TextComp";
import ContactsPopup from "../components/Contacts/ContactsPopup";
import ReminderContactsList from "../components/ReminderContactsList";
import moment from "moment";

class AddReminderScreen extends React.Component {
  state = {
    date: new Date(),
    show: false,
    notify: "On the same day",
    open: false,
    title: "",
    visible: false,
    input: "",
  };

  render() {
    let dropdownItems = [
      {
        label: "On the same day",
        value: "On the same day",
      },
      {
        label: "One day before",
        value: "One day before",
      },
      {
        label: "One week before",
        value: "One week before",
      },
      {
        label: "None",
        value: "None",
      },
    ];

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <ContactsPopup
            visible={this.state.visible}
            contacts={this.props.contacts}
            addContact={(contact) => {
              this.props.add(contact);
            }}
            close={() => {
              this.setState({ visible: false });
            }}
          />

          <View style={styles.header}>
            <Header
              leftComponent={
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Home");
                  }}
                >
                  <Ionicons
                    name="ios-arrow-back"
                    size={24}
                    color="grey"
                    style={{ marginLeft: 15 }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <TextComp style={styles.headerText}>New Reminder</TextComp>
              }
            />
          </View>
          <View style={styles.body}>
            <Input
              title="Event Title"
              placeholder="Add event title"
              auto={true}
              value={this.state.title}
              onChangeText={(title) => {
                this.setState({ title });
              }}
              error={this.props.error}
            />
            <View style={styles.container}>
              <TextComp style={styles.text}>Date</TextComp>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.dateContainer,
                borderColor: this.state.show
                  ? Colors.primaryColor
                  : Colors.secondary,
                borderWidth: this.state.show ? 2 : 0.5,
              }}
              onPress={() => {
                this.setState({ show: !this.state.show });
                Keyboard.dismiss();
              }}
            >
              <TextComp style={styles.text}>
                {this.state.date.toDateString()}
              </TextComp>
              <Ionicons
                name={this.state.show ? "ios-arrow-up" : "ios-arrow-down"}
                size={16}
                style={{ flex: 0.13 }}
              />
            </TouchableOpacity>
            {this.state.show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.date}
                mode="date"
                display="default"
                onChange={(event, date) => this.setState({ date })}
              />
            ) : null}

            <DropDownPicker
              style={{ borderWidth: 0 }}
              defaultValue={this.state.notify}
              items={dropdownItems}
              containerStyle={{
                ...styles.input,
                borderWidth: this.state.open ? 2 : 0.5,
                borderColor: this.state.open
                  ? Colors.primaryColor
                  : Colors.secondary,
              }}
              itemStyle={{ justifyContent: "flex-start" }}
              labelStyle={{ color: Colors.secondary, fontFamily: "regular" }}
              dropDownStyle={{ marginTop: 7, marginLeft: 20 }}
              arrowSize={18}
              arrowStyle={{ alignSelf: "center" }}
              onOpen={() => {
                this.setState({ show: false, open: true });
                Keyboard.dismiss();
              }}
              onClose={() => {
                this.setState({ open: false });
              }}
              onChangeItem={(item) => {
                this.setState({ notify: item.value });
              }}
            />

            <ReminderContactsList
              data={this.props.reminderContacts.filter(
                (contact) => contact !== null
              )}
              onOpen={(index) => {
                index === 0 && this.setState({ visible: true });
              }}
            />
          </View>
          <View style={styles.footer}>
            <Btn
              title="Create reminder"
              btnColor={Colors.primaryColor}
              style={{ width: "80%", alignSelf: "center" }}
              onPress={() => {
                this.props.create(
                  this.props.user,
                  this.state.date,
                  this.props.reminderContacts,
                  this.state.title,
                  this.state.notify,
                  this.props.user.token
                );
              }}
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
  },
  text: {
    fontSize: 14,
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
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 12,
    padding: 2,
    height: 45,
    marginVertical: 15,
  },

  dateContainer: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flex: 0.1,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminderContacts: state.reminders.contacts,
  contacts: state.contacts.contacts,
  error: state.reminders.error,
});

const mapDispatchToProps = {
  add: addContactsToReminder,
  create: addReminder,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderScreen);
