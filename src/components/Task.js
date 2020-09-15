import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Octicons, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import RadioButton from "./RadioButton";

const Task = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.task}>
      <View style={{ flexDirection: "row", flex: 0.85 }}>
        <Octicons name="primitive-dot" size={24} color={Colors.secondary} />
        <Text style={styles.taskText}>{props.text}</Text>
      </View>
      <Entypo name="phone" size={24} color={Colors.primaryColor} />
      <RadioButton checked={checked} onPress={() => setChecked(!checked)} />
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: "Futura",
  },
});

export default Task;
