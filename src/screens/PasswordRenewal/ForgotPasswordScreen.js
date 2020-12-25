import React from "react";
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
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { connect } from "react-redux";
import { forgotPassword, verifyEmail } from "../../store/actions/users";

const mapStateToProps = (state) => ({
  confirm: state.users.confirm,
});

class ForgotPasswordScreen extends React.Component {
  state = {
    email: "",
    error: "",
    code: "",
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
              {this.props.confirm
                ? `An email was sent to ${this.state.email} with the instructions. Enter the code sent to your inbox to proceed with the password renewal for your account.`
                : "Confirm your email and we'll send the instructions"}
            </Text>
          </View>

          {/* Input */}
          <View style={{ ...styles.container, flex: 0.05, paddingBottom: 30 }}>
            <View
              style={{
                width: this.props.confirm ? "50%" : "80%",
                alignItem: "center",
              }}
            >
              {this.props.confirm ? (
                <View>
                  <OTPInputView
                    style={{ marginTop: 10 }}
                    code={this.state.code}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeChanged={(code) => {
                      this.setState({ code });
                    }}
                  />
                  <Text style={styles.errorStyle}>{this.state.error}</Text>
                </View>
              ) : (
                <Input
                  placeholder="Enter email"
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  error={this.state.error}
                  autoCapitalize="none"
                />
              )}
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
                  !this.props.confirm
                    ? this.props.forgot(this.state.email)
                    : this.props
                        .verify(this.state.email, this.state.code)
                        .then(() => {
                          this.props.navigation.navigate("RenewPassword", {
                            email: this.state.email,
                          });
                        });
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
  errorStyle: {
    textAlign: "center",
    color: "#990000",
    marginTop: 0,
    fontWeight: "600",
    fontFamily: "Futura",
  },
});

const mapDispatchToProps = {
  forgot: forgotPassword,
  verify: verifyEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
