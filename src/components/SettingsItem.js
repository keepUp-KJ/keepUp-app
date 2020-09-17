import React, { useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";

const SettingsItem = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [notify, setNotify] = useState(false);
  const notifySwitch = () => setNotify((previousState) => !previousState);
  return (
    <View style={styles.container}>
      {/* text area */}
      <View style={{ marginLeft: 20, flex: 0.55 }}>
        <Text style={styles.text}>{props.text} </Text>
      </View>
      {/* dropdown or switch */}
      <View
        style={{
          flex: 0.45,
          alignItems: "center",
        }}
      >
        {props.switch ? (
          <View>
            <Switch
              style={{ marginVertical: 10 }}
              trackColor={{
                false: Colors.secondary,
                true: Colors.primaryColor,
              }}
              thumbColor={"white"}
              ios_backgroundColor="white"
              toggleSwi
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        ) : null}
        {props.dropdown ? (
          <View style={{ borderWidth: 0, width: "100%" }}>
            <DropDownPicker
              style={{ borderWidth: 0, width: "100%" }}
              items={props.dropdownItems}
              defaultValue={notify}
              containerStyle={{
                ...styles.input,
                height: 50,
                width: "100%",
              }}
              itemStyle={{ justifyContent: "flex-start" }}
              labelStyle={{ color: Colors.secondary, fontFamily: "Futura" }}
              selectedLabelStyle={{ fontWeight: "700" }}
              dropDownStyle={{ marginTop: 5, marginLeft: 20, width: "100%" }}
              arrowSize={18}
              arrowStyle={{ marginTop: -4 }}
              onChangeItem={notifySwitch}
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
    fontSize: 16,
    fontFamily: "Futura",
  },
  input: {
    borderRadius: 25,
    width: "100%",
    borderColor: Colors.secondary,
    marginRight: 10,
  },
});

export default SettingsItem;
