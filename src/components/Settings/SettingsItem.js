import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const SettingsItem = (props) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <TextComp style={{ ...styles.title, color: props.titleColor }}>
            {props.title}
          </TextComp>
        </View>

        <View style={{ flex: 0.9, alignItems: "flex-end" }}>
          <Switch
            style={{ marginVertical: 15 }}
            trackColor={{
              false: Colors.secondary,
              true: Colors.primaryColor,
            }}
            thumbColor={"white"}
            ios_backgroundColor="white"
            onValueChange={props.onValueChange}
            value={props.value}
          />
        </View>
      </View>
      <TextComp style={styles.text} numberOfLines={3}>
        {props.text}
      </TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: Colors.secondary,
    marginHorizontal: 20,
    width: "60%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 12,
    borderColor: Colors.secondary,
  },
});

export default SettingsItem;
