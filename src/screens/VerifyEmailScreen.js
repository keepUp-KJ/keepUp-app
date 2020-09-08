import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Btn from "../components/Btn";

class VerifyEmailScreen extends React.Component {
  state = {
    code: "1234",
    error: "",
  };

  verifyHandler = (code) => {
    fetch("http://192.168.1.11:3000/api/users/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ loading: false });
        if (json.response) {
          this.props.navigation.navigate("Home");
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
                this.props.navigation.navigate("SignUp");
              }}
            />
          </View>

          {/* Header */}
          <View style={{ alignItems: "center", flex: 0.05 }}>
            <Text style={styles.title}>VERIFY YOUR EMAIL</Text>
          </View>

          {/* Body */}
          <View style={{ ...styles.container, flex: 0.2 }}>
            <Text style={styles.body}>
              Thank you for choosing KeepUp! {"\n\n"}Please confirm that{" "}
              <Text style={{ fontWeight: "bold" }}>johndoe@gmail.com</Text> is
              your email address by entering the code sent to your inbox
            </Text>
          </View>

          <View style={{ ...styles.container, flex: 0.1 }}>
            <View style={{ width: "60%" }}>
              <OTPInputView
                style={{ marginTop: 10 }}
                code={this.state.code}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                  this.setState({ code });
                }}
              />
              <Text style={styles.errorStyle}>{this.state.error}</Text>
              <Btn
                title="VERIFY"
                btnColor={Colors.primaryColor}
                fontSize={12}
                bold
                onPress={() => this.verifyHandler(this.state.code)}
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
    justifyContent: "center",
    alignItems: "center",
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
  errorStyle: {
    textAlign: "center",
    color: "#990000",
    marginTop: -15,
  },
});

export default VerifyEmailScreen;
