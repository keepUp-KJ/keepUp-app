import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";

//Redux
import { connect } from "react-redux";
import {
  addContactsToReminder,
  addReminder,
  cancelReminder,
  hideError,
  removeContactFromReminder,
} from "../store/actions/reminders";

//Components & Constants
import Btn from "../components/Btn";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import TextComp from "../components/TextComp";
import ReminderCalendar from "../components/AddReminder/Calendar";
import ContactsPopup from "../components/AddReminder/ContactsPopup";
import ReminderContactsList from "../components/AddReminder/ReminderContactsList";

//Methods
import { scheduleNewReminderNotification } from "../methods/notifications";

const today = new Date();
class AddReminderScreen extends React.Component {
  state = {
    date: today,
    notify: "On the same day",
    open: false,
    title: "",
    visible: false,
    input: "",
    calendarVisible: false,
    markedDates: {},
    calendar: false,
  };

  componentDidMount() {
    const date = this.props.navigation.getParam("date");
    if (date) {
      this.setState({ date: new Date(date), calendar: true });
    }

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    let markedDates = {};
    markedDates[moment().format("YYYY-MM-DD")] = { selected: true };

    this.setState({ markedDates });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    const date = this.props.navigation.getParam("date");

    this.state.calendar
      ? this.props.navigation.navigate("Calendar", { date })
      : this.props.navigation.navigate("Home");
    return true;
  };

  getSelectedDayEvents = (date) => {
    let markedDates = {};

    markedDates[date] = {
      selected: true,
      color: Colors.primaryColor,
      textColor: "black",
    };
    let serviceDate = moment(date);
    this.setState({
      date: serviceDate,
      markedDates,
    });
  };

  addReminderHandler = () => {
    let contacts = this.props.reminderContacts;
    this.props
      .create(
        this.props.user._id,
        this.state.date,
        this.props.reminderContacts,
        this.state.title,
        this.state.notify,
        this.props.user.token
      )
      .then(() => {
        if (!this.props.error) {
          Platform.OS === "ios" &&
            scheduleNewReminderNotification(
              this.state.notify,
              this.state.date,
              this.state.title,
              contacts
            );
          this.handleBackButtonClick();
        }
      });
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
                    this.props.cancel().then(this.handleBackButtonClick);
                  }}
                >
                  <Ionicons name="ios-arrow-back" size={24} color="grey" />
                </TouchableOpacity>
              }
              centerComponent={
                <TextComp style={styles.headerText}>New Reminder</TextComp>
              }
              rightComponent={<></>}
            />
          </View>
          <View style={styles.body}>
            <Input
              title="Event Title"
              placeholder="Add event title"
              auto={true}
              value={this.state.title}
              onChangeText={(title) => {
                this.props.hide();
                this.setState({ title });
              }}
              error={this.props.error}
            />
            <View style={styles.container}>
              <TextComp style={styles.text}>Date</TextComp>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    calendarVisible: !this.state.calendarVisible,
                  });
                }}
              >
                <TextComp
                  bold
                  style={{ color: Colors.primaryColor, fontSize: 14 }}
                >
                  {this.state.date.toDateString()}
                </TextComp>
              </TouchableOpacity>
            </View>
            {this.state.calendarVisible && (
              <ReminderCalendar
                dates={this.state.markedDates}
                date={this.state.date}
                onDayPress={(day) => {
                  const date = new Date(day.dateString);
                  this.getSelectedDayEvents(day.dateString);
                  this.setState({ date });
                }}
              />
            )}
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
                this.setState({ open: true });
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
              loading={this.props.loading}
              title="Create reminder"
              btnColor={Colors.primaryColor}
              style={{ width: "80%", alignSelf: "center" }}
              onPress={this.addReminderHandler}
            />
          </View>
          <ContactsPopup
            visible={this.state.visible}
            contacts={this.props.pending.concat(this.props.accepted)}
            pickedContacts={this.props.reminderContacts}
            addContact={(contact) => {
              this.props.add(contact);
            }}
            removeContact={(contact) => {
              this.props.remove(contact);
            }}
            close={() => {
              this.setState({ visible: false });
            }}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 40,
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
    flex: 0.85,
    marginHorizontal: 30,
    marginBottom: 50,
  },
  calendar: {
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    elevation: 0.05,
    borderRadius: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 20,
    marginVertical: 12,
    padding: 2,
    height: 45,
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminderContacts: state.reminders.contacts,
  contacts: state.contacts.contacts,
  error: state.reminders.error,
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  loading: state.reminders.loading,
});

const mapDispatchToProps = {
  add: addContactsToReminder,
  remove: removeContactFromReminder,
  create: addReminder,
  cancel: cancelReminder,
  hide: hideError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderScreen);
