import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Tab from "./Tab";
import { navigate } from "../../navigation/navigationRef";

const TabNav = (props) => {
  const [active, setActive] = useState(props.active);

  return (
    <View style={styles.menu}>
      <Tab
        text="Home"
        iconName="md-home"
        active={active === "home"}
        onPress={() => {
          setActive("home");
          navigate("Home");
        }}
      />
      <Tab
        text="Contacts"
        iconName="md-contacts"
        active={active === "contacts"}
        onPress={() => {
          setActive("contacts");
          navigate("Contacts");
        }}
      />
      <Tab
        iconName="ios-add"
        center
        onPress={() => {
          navigate("AddReminder");
        }}
      />
      <Tab
        text="Calendar"
        iconName="md-calendar"
        active={active === "calendar"}
        onPress={() => {
          setActive("calendar");
          navigate("Calendar");
        }}
      />
      <Tab
        text="Settings"
        iconName="md-settings"
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
