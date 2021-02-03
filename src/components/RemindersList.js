import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Task from "./Task";
import TextComp from "./TextComp";
import moment from "moment";

renderEmpty = () => <TextComp style={styles.text}>No reminders</TextComp>;

const RemindersList = (props) => {
  const today = moment().format("MMM DD, YYYY");

  return (
    <View style={{ flex: 0.73 }}>
      <FlatList
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        data={props.data.filter(
          (reminder) => reminder.date === today && !reminder.completed
        )}
        renderItem={(itemData) => (
          <Task
            reminder={itemData.item}
            completeTask={() => {
              props.onComplete(itemData);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 40,
  },
});

export default RemindersList;
