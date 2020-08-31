import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { Ionicons } from "@expo/vector-icons";

class RenewPasswordScreen extends React.Component {
  render() {
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <Text
                name="md-arrow-back"
                size={30}
                style={{ color: Colors.secondary, fontFamily: "Futura" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={{ ...styles.container, flex: 0.2 }}>
            <Text style={styles.title}>RENEW PASSWORD</Text>
            <Text style={styles.body}>
              Enter new password for your account{" "}
            </Text>
          </View>

          {/* Input */}
          <View style={{ ...styles.container, flex: 0.15, paddingBottom: 30 }}>
            <View style={{ ...styles.input, width: "80%" }}>
              <Input placeholder="Password" style={{ ...styles.input }} />
            </View>

            <View style={{ ...styles.input, width: "80%" }}>
              <Input
                placeholder="Confirm Password"
                style={{ ...styles.input }}
              />
            </View>
          </View>

          {/* Confirm button */}
          <View style={{ ...styles.container, flex: 0.15 }}>
            <View style={{ width: "60%" }}>
              <Btn
                title="CONFIRM"
                btnColor={Colors.primaryColor}
                fontSize={14}
                bold
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
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
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "800",
    color: Colors.secondary,
    marginHorizontal: 14,
    fontFamily: "Futura",
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.secondary,
    marginTop: 10,
    marginHorizontal: 70,
    fontFamily: "Futura",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  underlineStyleBase: {
    width: 35,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "grey",
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primaryColor,
  },
});

export default RenewPasswordScreen;
