import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";

const SettingsItem = (props) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        {/* text area */}
        <View style={{ marginHorizontal: 20, flex: 0.55 }}>
          <Text style={{ ...styles.title, color: props.titleColor }}>
            {props.title}{" "}
          </Text>
        </View>

        {/* dropdown or switch */}
        <View style={{ flex: 0.35, alignItems: "flex-end" }}>
          {props.switch ? (
            <Switch
              style={{ marginVertical: 15 }}
              trackColor={{
                false: Colors.secondary,
                true: Colors.tomato,
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
      <Text style={styles.text} numberOfLines={3}>
        {props.text}
      </Text>
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
    fontFamily: "Futura",
  },
  text: {
    fontFamily: "Futura",
    fontSize: 14,
    color: Colors.secondary,
    marginHorizontal: 20,
    width: "60%",
  },
});

export default SettingsItem;
