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
    error: "",
    loading: false,
  };

  signupHandler = (email, password) => {
    this.setState({ loading: true });
    fetch("http://192.168.1.140:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          this.props.navigation.navigate("VerifyEmail", {
            email: this.state.email,
          });
        } else {
          this.setState({ error: json.error, loading: false });
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
                  this.setState({ email });
                }}
                title="Email"
                placeholder="contact@example.com"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({ password });
                }}
                title="Password"
                secureTextEntry
                style={styles.input}
                autoCorrect={false}
              />
              <Input
                value={this.state.confPassword}
                onChangeText={(confPassword) => {
                  this.setState({ confPassword });
                }}
                title="Confirm Password"
                secureTextEntry
                style={styles.input}
                autoCorrect={false}
              />
              <Text style={styles.errorText}>{this.state.error}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={{ width: "70%" }}>
              <Btn
                title="SIGN UP"
                btnColor={Colors.primaryColor}
                fontSize={12}
                bold
                loading={this.state.loading}
                onPress={() => {
                  this.signupHandler(this.state.email, this.state.password);
                }}
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
    justifyContent: "flex-start",
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
    marginTop: 10,
    fontFamily: "Futura",
    color: "#990000",
  },
});

export default SignupScreen;
