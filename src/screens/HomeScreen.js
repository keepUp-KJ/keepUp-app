import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import Btn from "../components/Btn";
import moment from "moment";

class HomeScreen extends React.Component {
  render() {
    const TASKS = [
      { text: "Call Jana" },
      { text: "It's Khaled birthday! call him " },
    ];
    var today = moment().format("MMMM DD");

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.head}>
          <Text style={styles.date}>
            <Text style={{ color: Colors.primaryColor }}>TODAY</Text>
          </Text>
          <Text style={styles.date}>
            <Text style={{ color: Colors.primaryColor }}>
              {today.toUpperCase()}
            </Text>
          </Text>
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
          <Text style={styles.bodyText}>UP COMING BIRTHDAYS</Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Btn
              title="Show all"
              btnColor="white"
              fontSize={14}
              bold
              textColor={Colors.primaryColor}
              style={{ width: "50%" }}
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
    fontSize: 30,
    fontWeight: "700",
  },
  body: { flex: 0.7, backgroundColor: Colors.primaryColor, marginBottom: -50 },
  bodyText: {
    margin: 30,
    fontSize: 20,
    color: Colors.secondary,
    fontFamily: "Futura",
    fontWeight: "700",
  },
});

export default HomeScreen;
