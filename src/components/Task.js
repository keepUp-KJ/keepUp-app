import React from "react";
import { Dimensions } from "react-native";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";

const Task = (props) => {
  const taskXPos = new Animated.Value(0);
  const taskPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      taskXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      const width = Dimensions.get("window").width;
      if (gs.dx < -1 * width * 0.4) {
        Animated.timing(taskXPos, {
          toValue: -1 * width,
          duration: 250,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) {
            props.completeTask();
          }
        });
      } else {
        taskXPos.setValue(0);
      }
    },
  });

  return (
    <Animated.View
      {...taskPanResponder.panHandlers}
      style={{ ...styles.task, left: taskXPos }}
    >
      <View style={styles.container}>
        <TextComp style={styles.taskText}>
          Call {props.reminder.contacts[0].firstName}{" "}
          {props.reminder.contacts[0].lastName}
        </TextComp>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
    marginVertical: 10,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.secondary,
  },
  container: { flexDirection: "row", alignItems: "center" },
});

export default Task;
