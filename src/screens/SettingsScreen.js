import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import SettingsItem from "../components/SettingsItem";
import Btn from "../components/Btn";
import { Ionicons } from "@expo/vector-icons";

class SettingsScreen extends React.Component {
  state = {
    enabled: true,
  };

  render() {
    let options = [
      {
        label: "On the same day",
        value: "1",
      },
      {
        label: "1 day before",
        value: "2",
      },
      {
        label: "1 week before",
        value: "3",
      },
      {
        label: "None",
        value: "4",
      },
    ];
    let incompleteOptions = [
      {
        label: "1 day after",
        value: "1",
      },
      {
        label: "1 week after",
        value: "2",
      },
      {
        label: "None",
        value: "3",
      },
    ];

    return (
      <SafeAreaView style={styles.screen}>
        {/* back arrow */}
        <View style={styles.top}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text}>SETTINGS</Text>
              </View>
            }
            leftComponent={
              <View>
                <Ionicons
                  name="md-arrow-back"
                  size={30}
                  color={Colors.secondary}
                  onPress={() => {
                    this.props.navigation.navigate("Home");
                  }}
                />
              </View>
            }
          />
        </View>
        <View style={{ ...styles.container, flex: 0.04 }}>
          <Text style={styles.headerText}>REMINDER</Text>
        </View>
        <View style={{ borderWidth: 0, marginBottom: 50, flex: 0.3 }}>
          <SettingsItem
            text="Birthday reminder"
            dropdown
            dropdownItems={options}
            zIndex={3}
          />
          <SettingsItem
            text="Calls reminder"
            dropdown
            dropdownItems={options}
            zIndex={2}
          />
          <SettingsItem
            text="Incomplete task reminder"
            dropdown
            dropdownItems={incompleteOptions}
            zIndex={1}
          />
          <View style={{ ...styles.container, marginTop: 80 }}>
            <Text style={styles.headerText}>NOTIFICATIONS</Text>
          </View>
        </View>
        <View style={{ flex: 0.35, justifyContent: "flex-end" }}>
          <SettingsItem text="Birthday Notifications" switch />
          <SettingsItem text="Daily calls Notifications" switch />
          <SettingsItem text="Incomplete task Notifications" switch />
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={{ width: "40%" }}>
            <Btn
              title="Sign out"
              btnColor={Colors.primaryColor}
              fontSize={16}
              loading={this.state.loading}
              textColor="white"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    flex: 0.1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  container: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    marginVertical: 20,
    padding: 10,
    zIndex: 0,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.primaryColor,
    fontFamily: "Futura",
  },
  text: {
    fontSize: 24,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Futura",
    color: "white",
    textAlign: "left",
    marginHorizontal: 15,
    fontWeight: "700",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.2,
    marginTop: 20,
  },
});

export default SettingsScreen;
