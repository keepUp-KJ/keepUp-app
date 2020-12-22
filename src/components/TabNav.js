import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MenuItem from "./MenuItem";
import { navigate } from "../navigation/navigationRef";

const TabNav = (props) => {
  const [active, setActive] = useState(props.active);

  return (
    <View style={styles.menu}>
      <MenuItem
        text="Home"
        iconName="ios-home"
        active={active === "home"}
        onPress={() => {
          setActive("home");
          navigate("Home");
        }}
      />
      <MenuItem
        text="Contacts"
        iconName="ios-contacts"
        active={active === "contacts"}
        onPress={() => {
          setActive("contacts");
          navigate("Contacts");
        }}
      />
      <MenuItem
        iconName="ios-add"
        center
        onPress={() => {
          navigate("AddReminder");
        }}
      />
      <MenuItem
        text="Calendar"
        iconName="ios-calendar"
        active={active === "calendar"}
        onPress={() => {
          setActive("calendar");
          navigate("Calendar");
        }}
      />
      <MenuItem
        text="Settings"
        iconName="ios-settings"
        active={active === "settings"}
        onPress={() => {
          setActive("settings");
          navigate("Settings");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    flex: 0.08,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default TabNav;
