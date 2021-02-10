import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Task from "../Task";
import TextComp from "../TextComp";
import moment from "moment";
import { setCompleted } from "../../store/actions/reminders";
import { connect } from "react-redux";

renderEmpty = () => <TextComp style={styles.text}>NO REMINDERS</TextComp>;

class RemindersList extends React.Component {
  render() {
    const today = moment().format("MMM DD, YYYY");

    return (
      <View style={{ flex: 0.73 }}>
        <FlatList
          ListEmptyComponent={renderEmpty}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          data={this.props.reminders.filter(
            (reminder) => reminder.date === today && !reminder.completed
          )}
          renderItem={(itemData) => (
            <Task
              reminder={itemData.item}
              completeTask={() => {
                this.props.complete(itemData.item._id, this.props.user.token);
              }}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    alignSelf: "center",
    marginTop: 40,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.todayReminders,
});

const mapDispatchToProps = {
  complete: setCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemindersList);
