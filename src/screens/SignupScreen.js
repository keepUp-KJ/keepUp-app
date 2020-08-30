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
                title="Email"
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                title="Password"
                secureTextEntry
                placeholder="Password"
                style={styles.input}
                autoCorrect={false}
              />
              <Input
                title="Confirm Password"
                secureTextEntry
                placeholder="Confirm Password"
                style={styles.input}
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={{ width: "70%" }}>
              <Btn
                title="SIGN UP"
                btnColor={Colors.primaryColor}
                fontSize={14}
                bold
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
    fontSize: 30,
    textAlign: "center",
    fontWeight: "800",
    color: Colors.secondary,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.15,
  },
  termsText: {
    textAlign: "center",
    marginHorizontal: 40,
    fontSize: 12,
    width: "60%",
    color: Colors.secondary,
  },
});

export default SignupScreen;
