import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const Task = (props) => {
  const _animatedWidth = new Animated.Value(0);

  function setCompleted() {
    Animated.timing(_animatedWidth, {
      toValue: 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return (
    <TouchableOpacity style={styles.task} onPress={setCompleted}>
      <View style={styles.container}>
        <Animated.View
          style={{
            width: _animatedWidth,
            borderWidth: 1.5,
            borderColor: Colors.secondary,
            position: "absolute",
            borderRadius: 10,
          }}
        />
        <Text style={styles.taskText}>
          Call{" "}
          {props.reminder.contacts[0].firstName +
            " " +
            props.reminder.contacts[0].lastName}
        </Text>
      </View>
    </TouchableOpacity>
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
    fontFamily: "Futura",
  },
  container: { flexDirection: "row", alignItems: "center" },
});

export default Task;
