import React from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import TabNav from "../components/TabNav";
import moment from "moment";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import { connect } from "react-redux";
import { getReminders } from "../store/actions/reminders";

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.get();
  }

  render() {
    var today = moment().format("MMMM DD");
    const REMINDERS = [
      {
        text: `Call Janito`,
        frequency: "Daily",
        completed: false,
      },
      {
        text: "It's Ahmed's birthday!",
      },
    ];

    return (
      <SafeAreaView style={styles.screen}>
        {/* MAIN */}
        <View style={styles.main}>
          <View style={styles.head}>
            <Text style={styles.date}>TODAY</Text>
            <Text style={styles.date}>{today.toUpperCase()}</Text>
          </View>
          <View style={{ flex: 0.75 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.reminders}
              renderItem={(itemData) => <Task reminder={itemData.item} />}
              keyExtractor={(item) => item.text}
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
    justifyContent: "center",
  },
  main: {
    flex: 0.92,
  },
  head: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primaryColor,
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
