import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";

const SettingsItem = (props) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        {/* text area */}
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ ...styles.title, color: props.titleColor }}>
            {props.title}{" "}
          </Text>
        </View>

        {/* dropdown or switch */}
        <View style={{ flex: 0.9, alignItems: "flex-end" }}>
          {props.switch ? (
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
          ) : null}
        </View>
      </View>
      <Text style={styles.text} numberOfLines={3}>
        {props.text}
      </Text>
      {props.dropdown ? (
        <View style={{ width: "80%", marginHorizontal: 20 }}>
          <DropDownPicker
            zIndex={2}
            style={{ borderWidth: 0 }}
            items={props.dropdownItems}
            defaultValue={props.value}
            containerStyle={{
              ...styles.input,
              height: 40,
              marginVertical: 15,
            }}
            itemStyle={{ justifyContent: "flex-start" }}
            labelStyle={{
              color: Colors.secondary,
              fontFamily: "Futura",
              fontSize: 12,
            }}
            dropDownStyle={{ marginTop: 1, marginLeft: 20 }}
            arrowSize={18}
            arrowStyle={{ alignSelf: "center" }}
            showArrow={true}
            selectedLabelStyle={{ fontWeight: "700" }}
            onChangeItem={(item) => props.onChangeItem(item)}
          />
        </View>
      ) : null}
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
    marginBottom: 10,
  },
  text: {
    fontFamily: "Futura",
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
