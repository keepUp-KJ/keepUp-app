import React, { Suspense } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { signup, hideError } from "../../store/actions/users";

class SignupScreen extends React.Component {
  state = {
    email: "",
    password: "",
    confPassword: "",
  };

  componentDidMount() {
    this.props.hideError("all");
  }

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
                  this.props.hideError("email");
                  this.setState({ email });
                }}
                title="Email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                error={this.props.errors.email}
              />
              <Input
                value={this.state.password}
                onChangeText={(password) => {
                  this.props.hideError("password");
                  this.setState({ password });
                }}
                title="Password"
                secureTextEntry
                placeholder="Password"
                autoCorrect={false}
                error={this.props.errors.password}
              />
              <Input
                value={this.state.confPassword}
                onChangeText={(confPassword) => {
                  this.props.hideError("confPassword");
                  this.setState({ confPassword });
                }}
                title="Confirm Password"
                secureTextEntry
                placeholder="Confirm Password"
                autoCorrect={false}
                error={this.props.errors.confPassword}
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
                loading={this.props.loading}
                bold
                onPress={() => {
                  this.props.signup(
                    this.state.email,
                    this.state.password,
                    this.state.confPassword
                  );
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

const mapStateToProps = (state) => ({
  loading: state.users.loading,
  errors: state.users.errors,
});

const mapDispatchToProps = {
  signup,
  hideError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
