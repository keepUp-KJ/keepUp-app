import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Btn from "../components/Btn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import Colors from "../constants/Colors";

class LoginScreen extends React.Component {
  state = {
    email: "johndoe@gmail.com",
    password: "mypass",
    error: "",
  };

  loginWithGoogle = () => {
    fetch("http://192.168.1.140:3000/api/users/login-google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  loginHandler = (email, password) => {
    fetch("http://192.168.1.140:3000/api/users/login", {
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
          {/* Title */}
          <View style={{ flex: 0.25, justifyContent: "center" }}>
            <Text style={styles.title}>
              Keep<Text style={{ color: Colors.primaryColor }}>Up</Text>
            </Text>
          </View>

          {/* Inputs */}
          <View style={{ flex: 0.25, justifyContent: "center", width: "80%" }}>
            <Input
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
              placeholder="Password"
              style={styles.input}
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ForgotPassword");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontFamily: "Futura",
                }}
              >
                Forgot password
                <Text style={{ fontFamily: "Arial" }}>?</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>

          {/* Buttons */}
          <View style={{ flex: 0.25, justifyContent: "center", width: "80%" }}>
            <Btn
              title="LOGIN"
              btnColor={Colors.primaryColor}
              fontSize={12}
              bold
              onPress={() =>
                this.loginHandler(this.state.email, this.state.password)
              }
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "50%" }}>
                <Btn
                  icon={<Ionicons name="logo-google" color="white" size={16} />}
                  title="LOGIN WITH GOOGLE"
                  btnColor={Colors.secondary}
                  fontSize={8}
                  bold
                  onPress={() => this.loginWithGoogle()}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Btn
                  icon={
                    <MaterialCommunityIcons
                      name="facebook"
                      color="white"
                      size={16}
                    />
                  }
                  title="LOGIN WITH FACEBOOK"
                  btnColor={Colors.secondary}
                  fontSize={8}
                  bold
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={{ fontFamily: "Futura" }}>
              Don't have an account
              <Text style={{ fontFamily: "Arial" }}>? </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{
                  color: Colors.primaryColor,
                  fontWeight: "700",
                  fontFamily: "Futura",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: Colors.secondary,
    fontFamily: "Futura",
  },
  input: {
    marginHorizontal: 7,
  },
  footerContainer: {
    flex: 0.25,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Futura",
    color: "#990000",
  },
});

export default LoginScreen;
