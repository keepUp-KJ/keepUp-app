import React from "react";
import {
  View,
  Alert,
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
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { Notifier } from "@airbrake/browser";

const airbrake = new Notifier({
  projectId: 297602,
  projectKey: "c08de80cdcacbf61e9b1091b4590c1ae",
  environment: "production",
});

class LoginScreen extends React.Component {
  state = {
    email: "johndoe@gmail.com",
    password: "mypass",
    error: "",
    loading: false,
  };

  loginWithGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      clientId:
        "185536610149-0a5l8ktbfqciapvko2mkf4dmisk4epq8.apps.googleusercontent.com",
      language: "en-US",
    });

    if (type === "success") {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    }
  };

  loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("2720884158015038");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        ).then(() => this.props.navigation.navigate("PickContacts"));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  loginHandler = (email, password) => {
    this.setState({ loading: true });
    try {
      fetch("https://keep-up-mock.herokuapp.com/api/users/login", {
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
            this.props.navigation.navigate("PickContacts");
          } else {
            this.setState({ error: json.error, loading: false });
          }
        });
    } catch (err) {
      airbrake.notify(err);
    }
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
              loading={this.state.loading}
              onPress={() => {
                this.loginHandler(this.state.email, this.state.password);
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "50%" }}>
                <Btn
                  icon={<Ionicons name="logo-google" color="white" size={16} />}
                  title="LOGIN WITH GOOGLE"
                  btnColor={Colors.secondary}
                  fontSize={8}
                  bold
                  onPress={this.loginWithGoogle}
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
                  onPress={this.loginWithFacebook}
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
