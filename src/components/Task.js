import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Octicons, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import RadioButton from "./RadioButton";

const Task = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.task}>
      <View style={{ ...styles.container, flex: 0.8 }}>
        <Octicons name="primitive-dot" size={20} color={Colors.secondary} />
        <Text style={styles.taskText}>Call {props.contact}</Text>
      </View>
      <View
        style={{
          ...styles.container,
          flex: 0.2,
          justifyContent: "space-between",
        }}
      >
        <Entypo name="phone" size={28} color={Colors.primaryColor} />
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
  },
  taskText: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.secondary,
    fontFamily: "Futura",
  },
  container: { flexDirection: "row", alignItems: "center" },
});

export default Task;
