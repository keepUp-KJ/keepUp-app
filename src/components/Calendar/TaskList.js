import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Task from "../Task";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";

class TaskList extends React.Component {
  render() {
    return (
      <View style={styles.list}>
        <TextComp style={styles.date}>{this.props.date.toString()}</TextComp>
        {this.props.reminders
          .filter((reminder) => reminder.date === this.props.date.toString())
          .map((item, key) => (
            <Task key={key} reminder={item} calendar />
          ))}
        {!this.props.reminders.find(
          (reminder) => reminder.date === this.props.date
        ) && (
          <TouchableOpacity style={styles.btn} onPress={this.props.addReminder}>
            <TextComp bold style={styles.text}>
              Add reminder
            </TextComp>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  date: {
    fontSize: 20,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 10,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(mapStateToProps)(TaskList);
