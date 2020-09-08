import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/Colors";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { Ionicons } from "@expo/vector-icons";

class ForgotPasswordScreen extends React.Component {
  state = {
    email: "johndoe@gmail.com",
    error: "",
  };

  confirmHandler = (email) => {
    fetch("http://localhost:3000/api/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.response) {
          this.props.navigation.navigate("VerifyEmail");
        } else {
          this.setState({ error: json.error });
        }
      });
  };

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
            <Ionicons
              name="md-arrow-back"
              size={30}
              color={Colors.secondary}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </View>

          {/* Header */}
          <View style={{ ...styles.container, flex: 0.2 }}>
            <Text style={styles.title}>FORGOT YOUR PASSWORD?</Text>
            <Text style={styles.body}>
              Confirm your email and we'll send the instructions
            </Text>
          </View>

          {/* Input */}
          <View style={{ ...styles.container, flex: 0.05, paddingBottom: 30 }}>
            <View style={{ width: "80%" }}>
              <Input
                placeholder="Enter email"
                style={styles.input}
                value={this.state.email}
                onChangeText={(email) => {
                  this.setState({ email });
                }}
                error={this.state.error}
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
                  this.confirmHandler(this.state.email);
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
    fontSize: 15,
    textAlign: "center",
    color: Colors.secondary,
    marginTop: 10,
    marginHorizontal: 30,
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

export default ForgotPasswordScreen;
