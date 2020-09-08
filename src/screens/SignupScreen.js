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

class SignupScreen extends React.Component {
  state = {
    email: "",
    password: "",
    confPassword: "",
    loading: false,
    emailError: "",
    passwordError: "",
    confPasswordError: "",
  };

  signupHandler = (email, password, confPassword) => {
    this.setState({ loading: true });
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ loading: false });
        if (json.token) {
          this.props.navigation.navigate("VerifyEmail");
        } else {
          if (json.error.includes("email") || json.error.includes("Email")) {
            this.setState({ emailError: json.error });
          } else if (json.error === "Password does not match") {
            this.setState({ confPasswordError: json.error });
          } else {
            this.setState({ passwordError: json.error });
          }
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
          <View style={{ ...styles.container, flex: 0.15 }}>
            <Text style={styles.title}>CREATE{"\n"}ACCOUNT</Text>
          </View>

          {/* Inputs */}
          <View style={{ ...styles.container, flex: 0.5 }}>
            <View style={{ width: "80%" }}>
              <Input
                value={this.state.email}
                onChangeText={(email) => {
                  this.setState({ email, emailError: "" });
                }}
                title="Email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                error={this.state.emailError}
              />
              <Input
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({ password, passwordError: "" });
                }}
                title="Password"
                secureTextEntry
                placeholder="Password"
                autoCorrect={false}
                error={this.state.passwordError}
              />
              <Input
                value={this.state.confPassword}
                onChangeText={(confPassword) => {
                  this.setState({ confPassword, confPasswordError: "" });
                }}
                title="Confirm Password"
                secureTextEntry
                placeholder="Confirm Password"
                autoCorrect={false}
                error={this.state.confPasswordError}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={{ width: "70%" }}>
              <Btn
                title="SIGN UP"
                btnColor={Colors.primaryColor}
                fontSize={12}
                loading={this.state.loading}
                bold
                onPress={() =>
                  this.signupHandler(
                    this.state.email,
                    this.state.password,
                    this.state.confPassword
                  )
                }
              />
            </View>

            <Text style={styles.termsText}>
              By creating an account you agree to our terms of service and
              privacy policy
            </Text>
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
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.secondary,
    fontFamily: "Futura",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.15,
  },
  termsText: {
    textAlign: "center",
    marginHorizontal: 40,
    fontSize: 10,
    width: "60%",
    color: Colors.secondary,
    fontFamily: "Futura",
  },
  errorText: {
    textAlign: "center",
    fontFamily: "Futura",
    color: "#990000",
  },
});

export default SignupScreen;
