import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import Btn from "../components/Btn";
import BirthdayReminder from "../components/BirthdayReminder.js";
import moment from "moment";

class HomeScreen extends React.Component {
  render() {
    const TASKS = [
      { text: "Call Jana" },
      { text: "It's Khaled birthday! call him " },
    ];

    const BIRTHDAYS = [
      {
        date: "30 September",
        contact: "Yusuf",
      },
    ];
    var today = moment().format("MMMM DD");

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.head}>
          <Text style={styles.date}>TODAY</Text>
          <Text style={styles.date}>{today.toUpperCase()}</Text>
        </View>

        <View style={{ flex: 0.2 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={TASKS}
            renderItem={(itemData) => (
              <Task text={itemData.item.text.toUpperCase()} />
            )}
            keyExtractor={(item) => item.text}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyText}>UPCOMING BIRTHDAYS</Text>
          <View style={{ width: "70%", justifyContent: "center" }}>
            <FlatList
              data={BIRTHDAYS}
              renderItem={(itemData) => (
                <BirthdayReminder
                  date={itemData.item.date}
                  contact={itemData.item.contact}
                />
              )}
              keyExtractor={(item) => item.contact}
            />
            <Btn
              title="Show all"
              btnColor="white"
              fontSize={14}
              bold
              textColor={Colors.primaryColor}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "center",
  },
  head: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primaryColor,
    fontFamily: "Futura",
  },
  body: {
    flex: 0.7,
    backgroundColor: Colors.primaryColor,
    marginBottom: -50,
    alignItems: "center",
  },
  bodyText: {
    margin: 30,
    fontSize: 20,
    color: Colors.secondary,
    fontFamily: "Futura",
    fontWeight: "700",
  },
});

export default HomeScreen;
