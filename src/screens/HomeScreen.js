import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import Task from "../components/Task";
import Btn from "../components/Btn";
import BirthdayReminder from "../components/BirthdayReminder.js";
import IconButton from "../components/IconButton";
import moment from "moment";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  state = {
    tasks: [],
    birthdays: [],
  };

  componentDidMount() {
    this.setState({ tasks: this.props.reminders });
  }

  renderEmpty = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <Text style={{ ...styles.bodyText, textAlign: "center" }}>
        You have no reminders for today :)
      </Text>
    </View>
  );

  render() {
    var today = moment().format("MMMM DD");

    return (
      <SafeAreaView style={styles.screen}>
        {/* HEADER - DATE */}
        <View style={styles.head}>
          <Text style={styles.date}>TODAY</Text>
          <Text style={styles.date}>{today.toUpperCase()}</Text>
        </View>

        {/*DAILY TASKS */}
        <View style={{ flex: 0.15 }}>
          <FlatList
            ListEmptyComponent={this.renderEmpty}
            showsVerticalScrollIndicator={false}
            data={this.state.tasks}
            renderItem={(itemData) => <Task contact={itemData.item.contact} />}
            keyExtractor={(item) => item.contact}
          />
        </View>

        {/* BODY - GREEN AREA */}
        <View style={styles.body}>
          <Text style={styles.bodyText}>UPCOMING BIRTHDAYS</Text>
          {/* BIRTHDAYS */}
          <View style={{ width: "80%", justifyContent: "center", flex: 0.3 }}>
            <FlatList
              data={this.state.birthdays}
              ListEmptyComponent={
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      ...styles.bodyText,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    You have no upcoming birthdays
                  </Text>
                  <Btn
                    title="Add contacts"
                    btnColor={Colors.secondary}
                    style={{ width: "80%", marginTop: 0 }}
                    onPress={() => {
                      this.props.navigation.navigate("Contacts", {
                        active: "Pending",
                      });
                    }}
                  />
                </View>
              }
              renderItem={(itemData) =>
                itemData.index < 2 ? (
                  <BirthdayReminder
                    date={itemData.item.date}
                    contact={itemData.item.contact}
                  />
                ) : null
              }
              keyExtractor={(item) => item.contact}
            />
          </View>
          {/* SHOW ALL BUTTON */}
          <View style={{ ...styles.btn, width: "60%", flex: 0.3 }}>
            {this.state.birthdays.length < 3 ? null : (
              <Btn
                title="Show all"
                btnColor="white"
                fontSize={14}
                bold
                textColor={Colors.primaryColor}
              />
            )}
          </View>
          {/* BUTTONS */}
          <View style={styles.bottomContainer}>
            <IconButton
              title="Contacts"
              onPress={() => {
                this.props.navigation.navigate("Contacts");
              }}
              icon={
                <MaterialIcons
                  name="person"
                  size={50}
                  color={Colors.secondary}
                />
              }
            />
            <IconButton
              title="Add Reminder"
              onPress={() => {
                this.props.navigation.navigate("CreateReminder");
              }}
              icon={
                <FontAwesome
                  name="calendar"
                  size={40}
                  color={Colors.secondary}
                />
              }
            />
            <IconButton
              title="Settings"
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
              icon={
                <MaterialIcons
                  name="settings"
                  size={50}
                  color={Colors.secondary}
                />
              }
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
  },
  head: {
    flex: 0.14,
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
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "Futura",
    fontWeight: "700",
  },
  btn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  bottomContainer: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(mapStateToProps)(HomeScreen);
