import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";

const SettingsItem = (props) => {
  return (
    <View style={{ ...styles.container, zIndex: props.zIndex }}>
      {/* text area */}
      <View style={{ marginHorizontal: 20, flex: 0.55 }}>
        <Text style={styles.text}>{props.text} </Text>
      </View>
      {/* dropdown or switch */}
      <View style={{ flex: 0.45, alignItems: "center" }}>
        {props.switch ? (
          <Switch
            style={{ marginVertical: 10 }}
            trackColor={{
              false: Colors.secondary,
              true: Colors.primaryColor,
            }}
            thumbColor={"white"}
            ios_backgroundColor="white"
            onValueChange={props.onValueChange}
            value={props.value}
          />
        ) : null}
        {props.dropdown ? (
          <View style={{ width: "100%" }}>
            <DropDownPicker
              style={{ borderWidth: 0 }}
              items={props.dropdownItems}
              defaultValue={props.value}
              containerStyle={{ height: 50 }}
              itemStyle={{ justifyContent: "flex-start" }}
              labelStyle={{
                color: Colors.secondary,
                fontFamily: "Futura",
                fontSize: 10,
                textAlign: "center",
              }}
              showArrow={false}
              selectedLabelStyle={{ fontWeight: "700" }}
              onChangeItem={(item) => props.onChangeItem(item)}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.secondary,
    fontSize: 14,
    fontFamily: "Futura",
  },
});

export default SettingsItem;
