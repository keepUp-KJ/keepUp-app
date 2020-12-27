import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "../../components/Settings/SettingsItem";
import TextComp from "../../components/TextComp";
import { Fragment } from "react";

class GeneralSettings extends React.Component {
  state = {
    birthday: "On the same day",
    dailyCalls: "On the same day",
    incompleteTask: "One day after",
  };

  render() {
    let options = [
      {
        label: "On the same day",
        value: "On the same day",
      },
      {
        label: "One day before",
        value: "One day before",
      },
      {
        label: "One week before",
        value: "One week before",
      },
      {
        label: "None",
        value: "None",
      },
    ];
    let incompleteOptions = [
      {
        label: "One day after",
        value: "One day after",
      },
      {
        label: "One week after",
        value: "One week after",
      },
      {
        label: "None",
        value: "None",
      },
    ];

    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.babyBlue }} />
        <SafeAreaView style={styles.screen}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Settings");
                }}
                style={{
                  flex: 0.6,
                  marginHorizontal: 20,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="md-arrow-back" size={25} color="white" />
              </TouchableOpacity>
              <View style={styles.container}>
                <TextComp bold style={styles.text}>
                  General
                </TextComp>
              </View>
            </View>
            <View style={styles.body}>
              <View style={{ zIndex: 3 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={options}
                  titleColor={Colors.babyBlue}
                  title="Birthday reminder"
                  text="Reminder of your accepted contacts birthdays"
                  value={this.state.birthday}
                  onChangeItem={(item) => {
                    this.setState({
                      birthday: item.value,
                    });
                  }}
                />
              </View>
              <View style={{ zIndex: 2 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={options}
                  titleColor={Colors.babyBlue}
                  title="Daily Calls reminder"
                  text="Reminder of your accepted contacts birthdays"
                  value={this.state.dailyCalls}
                  onChangeItem={(item) => {
                    this.setState({
                      dailyCalls: item.value,
                    });
                  }}
                />
              </View>
              <View style={{ zIndex: 1 }}>
                <SettingsItem
                  dropdown
                  dropdownItems={incompleteOptions}
                  titleColor={Colors.babyBlue}
                  title="Incomplete Task reminder"
                  text="Reminder of your accepted contacts birthdays"
                  value={this.state.incompleteTask}
                  onChangeItem={(item) => {
                    this.setState({
                      incompleteTask: item.value,
                    });
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    backgroundColor: Colors.babyBlue,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
    height: 100,
  },
  text: {
    color: "white",
    fontSize: 35,
  },
  body: {
    marginVertical: 20,
    flex: 0.7,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
