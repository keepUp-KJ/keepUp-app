import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Dropdown = (props) => {
  return (
    <DropDownPicker
      {...props}
      style={{
        borderWidth: 0,
        backgroundColor: "rgb(248, 249, 253)",
      }}
      items={props.items}
      defaultValue={props.value}
      containerStyle={styles.input}
      itemStyle={{ justifyContent: "center" }}
      labelStyle={{
        fontFamily: "regular",
        fontSize: 12,
        textTransform: "uppercase",
        color: Colors.secondary,
      }}
      dropDownStyle={{ marginTop: 1, marginLeft: 20 }}
      arrowSize={15}
      arrowStyle={{ alignSelf: "center" }}
      showArrow={true}
      selectedLabelStyle={{ fontSize: 14, color: "black" }}
      onChangeItem={(item) => props.setValue(item)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 20,
    borderColor: Colors.secondary,
    height: 40,
    marginVertical: 5,
  },
});

export default Dropdown;
