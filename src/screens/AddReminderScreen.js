import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
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
class AddReminderScreen extends React.Component {
  state = {
    date: new Date(),
    show: false,
    notify: "On the same day",
    open: false,
    title: "",
  };

  render() {
    const CONTACTS = [
      // { firstName: "Khaled", lastName: "Magued" },
      // { firstName: "Jana", lastName: "Hamdy" },
    ];
    CONTACTS.unshift({});
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
                <Text style={styles.headerText}>New Reminder</Text>
              }
            />
          </View>
          <View style={styles.body}>
            <Input
              title="Event Title"
              placeholder="Add event title"
              auto={true}
              value={this.state.title}
            />
            <View style={styles.container}>
              <Text style={styles.text}>Date</Text>
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
              <Text style={styles.text}>{this.state.date.toDateString()}</Text>
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
              labelStyle={{ color: Colors.secondary, fontFamily: "Futura" }}
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
            <FlatList
              ListHeaderComponent={
                <Text style={{ ...styles.text, marginVertical: 5 }}>
                  Contacts
                </Text>
              }
              data={CONTACTS}
              keyExtractor={(item) => item.firstName}
              numColumns={4}
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
            />
          </View>
          <View style={styles.footer}>
            <Btn
              title="Create reminder"
              btnColor={Colors.primaryColor}
              style={{ width: "80%", alignSelf: "center" }}
              onPress={() => {
                this.props.create(
                  this.state.date,
                  this.props.contacts,
                  this.state.title,
                  this.state.notify
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
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 12,
    padding: 2,
    height: 45,
    marginVertical: 15,
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
  contacts: state.reminders.contacts,
});

const mapDispatchToProps = {
  add: addContactsToReminder,
  create: addReminder,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderScreen);
