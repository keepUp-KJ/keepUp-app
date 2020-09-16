import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-datepicker";
import Colors from "../constants/Colors";
import Btn from "../components/Btn";
import Input from "../components/Input";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";

class CreateRemiderScreen extends React.Component {
  state = {
    date: new Date(),
  };

  render() {
    var today = moment().format("YYYY-MM-DD");

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          {/* back arrow */}
          <View
            style={{ flex: 0.1, justifyContent: "center", paddingLeft: 15 }}
          >
            <Ionicons
              name="md-arrow-back"
              size={30}
              color={Colors.secondary}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            />
          </View>

          {/* Header */}
          <View style={{ ...styles.container, flex: 0.15 }}>
            <Text style={styles.title}>ADD{"\n"}REMINDER</Text>
          </View>

          {/* Inputs */}
          <View style={{ ...styles.container, flex: 0.5 }}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="calendar-range"
                size={30}
                color={Colors.secondary}
              />
              <View style={{ width: "60%", marginHorizontal: 10 }}>
                <DatePicker
                  style={styles.input}
                  date={this.state.date}
                  minDate={today}
                  maxDate="2050-06-01"
                  format="DD MMM YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                    },
                    dateText: {
                      color: Colors.secondary,
                      fontWeight: "800",
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ date });
                  }}
                />
              </View>
            </View>

            <View style={styles.row}>
              <MaterialIcons name="people" size={30} color={Colors.secondary} />
              <View style={{ width: "60%", marginHorizontal: 10 }}>
                <Input
                  placeholder="Enter contact name"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.row}>
              <MaterialCommunityIcons
                name="clipboard-check"
                size={30}
                color={Colors.secondary}
              />
              <View style={{ width: "60%", marginHorizontal: 10 }}>
                <Input placeholder="Enter occasion" autoCorrect={false} />
              </View>
            </View>

            <View style={styles.row}>
              <MaterialCommunityIcons
                name="bell"
                size={30}
                color={Colors.secondary}
              />
              <View style={{ width: "60%", marginHorizontal: 10 }}>
                <Input placeholder="Enter alert" autoCorrect={false} />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={{ width: "70%" }}>
              <Btn
                title="Create"
                btnColor={Colors.primaryColor}
                fontSize={20}
                loading={this.state.loading}
                textColor="white"
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.primaryColor,
    fontFamily: "Futura",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.15,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontFamily: "Futura",
    width: "100%",
    marginVertical: 12,
    padding: 2,
    borderColor: Colors.secondary,
  },
});

export default CreateRemiderScreen;
