import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Octicons, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import RadioButton from "./RadioButton";

const Task = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.task}>
      <View style={{ ...styles.container, flex: 0.9 }}>
        <Text style={styles.taskText}>{props.reminder.text}</Text>
      </View>
      <View
        style={{
          ...styles.container,
          flex: 0.1,
          justifyContent: "space-between",
        }}
      >
        <RadioButton checked={checked} onPress={() => setChecked(!checked)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginVertical: 10,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "Futura",
  },
  container: { flexDirection: "row", alignItems: "center" },
});

export default Task;
