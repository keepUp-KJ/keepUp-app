import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Btn from "../components/Btn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import Colors from "../constants/Colors";

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
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
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Forgot password?
          </Text>
        </View>

        {/* Buttons */}
        <View style={{ flex: 0.25, justifyContent: "center", width: "80%" }}>
          <Btn
            title="LOGIN"
            btnColor={Colors.primaryColor}
            fontSize={12}
            bold
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "50%" }}>
              <Btn
                icon={<Ionicons name="logo-google" color="white" size={16} />}
                title="LOGIN WITH GOOGLE"
                btnColor={Colors.secondary}
                fontSize={8}
                bold
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
        <View style={{ flex: 0.25, justifyContent: "center" }}>
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: Colors.primaryColor, fontWeight: "700" }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: Colors.secondary,
  },

  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

export default LoginScreen;
