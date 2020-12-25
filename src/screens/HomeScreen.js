import React from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import TabNav from "../components/Tab/TabNav";
import moment from "moment";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import { connect } from "react-redux";
import { getReminders } from "../store/actions/reminders";
import { Calendar } from "react-native-event-week";

class HomeScreen extends React.Component {
  state = {
    date: new Date(),
  };
  componentDidMount() {
    this.props.get(this.props.user._id);
  }

  render() {
    var today = moment().format("MMM DD, YYYY");

    const events = [
      {
        title: "Important meeting",
        start: "2020-12-26 14:45",
        end: "2020-12-26 18:15",
        backgroundColor: "#41CAC0",
      },
      {
        title: "Coffee break",
        start: "2020-12-24 06:45",
        end: "2020-12-24 07:15",
        backgroundColor: "#41CAC0",
      },
    ];

    return (
      <SafeAreaView style={styles.screen}>
        {/* MAIN */}
        <View style={styles.main}>
          <View style={styles.head}>
            <Text style={styles.date}>{today}</Text>
            <Text style={styles.today}>Today</Text>
          </View>
          <View style={{ flex: 0.12 }}>
            <Calendar
              events={events}
              height={100}
              showTime={false}
              swipeEnabled={false}
              style={{ alignSelf: "center", marginLeft: -50 }}
            />
          </View>
          <View style={{ flex: 0.73 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.reminders.filter(
                (reminder) => reminder.date === today
              )}
              renderItem={(itemData) => (
                <Task
                  reminder={itemData.item}
                  completeTask={() => {
                    console.log("YOO");
                  }}
                />
              )}
              keyExtractor={(item) => item._id || item.contacts[0].id}
            />
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
    fontFamily: "Futura",
  },
  today: {
    fontSize: 35,
    fontFamily: "Futura",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.reminders,
});

const mapDispatchToProps = {
  get: getReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
