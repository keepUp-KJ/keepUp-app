import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import TabNav from "../components/Tab/TabNav";
import moment from "moment";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import { connect } from "react-redux";
import { getReminders, setCompleted } from "../store/actions/reminders";
import { Calendar } from "react-native-event-week";
import TextComp from "../components/TextComp";
import { ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
class HomeScreen extends React.Component {
  state = {
    date: new Date(),
    done: false,
  };

  today = moment().format("MMM DD, YYYY");

  getNotificationList() {
    let list = [];

    const todayReminders = this.props.reminders.filter(
      (reminder) => reminder.date === this.today && !reminder.completed
    );

    todayReminders.forEach((rem) => {
      let contacts = [];
      rem.contacts.forEach((contact) => {
        contacts.push(contact.firstName);
      });
      rem.occasion
        ? list.push(
            rem.occasion +
              " with " +
              rem.contacts[0].info.firstName +
              " " +
              rem.contacts[0].info.lastName +
              " & " +
              (rem.contacts.length - 1) +
              " others"
          )
        : list.push(
            " Call " +
              rem.contacts[0].info.firstName +
              " " +
              rem.contacts[0].info.lastName
          );
    });

    return list;
  }

  async notifyUser() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const trigger = new Date();
    // trigger.setHours(16);
    // trigger.setMinutes(18);
    // trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "TODAY",
        body: `${this.getNotificationList()}`,
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  componentDidMount() {
    this.props.get(this.props.user._id).then(() => {
      setTimeout(() => {
        this.notifyUser();
      }, 1000);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {/* MAIN */}
        <View style={styles.main}>
          <View style={styles.head}>
            <TextComp style={styles.date}>{this.today}</TextComp>
            <TextComp bold style={styles.today}>
              Today
            </TextComp>
          </View>
          <View style={{ flex: 0.12 }}>
            <Calendar
              events={[]}
              height={100}
              showTime={false}
              swipeEnabled={false}
              style={{ alignSelf: "center", marginLeft: -50 }}
            />
          </View>
          <View style={{ flex: 0.73 }}>
            {this.props.loading ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <FlatList
                ListEmptyComponent={
                  <TextComp style={styles.text}>No more reminders</TextComp>
                }
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                data={this.props.reminders.filter(
                  (reminder) =>
                    reminder.date === this.today && !reminder.completed
                )}
                renderItem={(itemData) => (
                  <Task
                    reminder={itemData.item}
                    completeTask={() => {
                      this.props.complete(itemData.item._id);
                    }}
                  />
                )}
              />
            )}
          </View>
        </View>

        {/* BOTTOM MENU */}
        <TabNav active="home" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    flex: 0.92,
  },
  head: {
    flex: 0.15,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  date: {
    fontSize: 16,
    color: Colors.secondary,
  },
  today: {
    fontSize: 35,
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 40,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.reminders,
  loading: state.reminders.loading,
});

const mapDispatchToProps = {
  get: getReminders,
  complete: setCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
