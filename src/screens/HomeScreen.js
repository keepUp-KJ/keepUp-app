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

class HomeScreen extends React.Component {
  state = {
    date: new Date(),
    done: false,
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
            <TextComp style={styles.date}>{today}</TextComp>
            <TextComp bold style={styles.today}>
              Today
            </TextComp>
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
            {this.props.loading ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.reminders.filter(
                  (reminder) =>
                    reminder.date === today && reminder.completed === false
                )}
                renderItem={(itemData) =>
                  itemData.item.contacts.map((contact) => (
                    <View key={contact.info.id}>
                      <Task
                        contact={contact}
                        reminder={itemData.item}
                        completeTask={() => {
                          this.props.complete(itemData.item._id, contact);
                        }}
                      />
                    </View>
                  ))
                }
                keyExtractor={(item) => item._id}
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
