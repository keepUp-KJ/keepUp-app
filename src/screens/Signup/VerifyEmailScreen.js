import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Btn from "../../components/Btn";
import { connect } from "react-redux";
import { hideLoginError, verifyEmail } from "../../store/actions/users";
import TextComp from "../../components/TextComp";

class VerifyEmailScreen extends React.Component {
  state = {
    code: "",
    error: "",
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <TextComp style={{ color: Colors.secondary }}>Cancel</TextComp>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={{ alignItems: "center", flex: 0.05 }}>
            <TextComp bold style={styles.title}>
              VERIFY YOUR EMAIL
            </TextComp>
          </View>

          {/* Body */}
          <View style={{ ...styles.container, flex: 0.2 }}>
            <TextComp style={styles.body}>
              Thank you for choosing KeepUp! {"\n\n"}Please confirm that{" "}
              <TextComp bold>{this.props.user.email}</TextComp> is your email
              address by entering the code sent to your inbox
            </TextComp>
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
                onCodeChanged={(code) => {
                  if (this.props.error) this.props.hide();
                  this.setState({ code });
                }}
              />
              <TextComp bold style={styles.errorStyle}>
                {this.props.error}
              </TextComp>
              <Btn
                title="VERIFY"
                btnColor={Colors.primaryColor}
                fontSize={12}
                bold
                loading={this.props.loading}
                onPress={() =>
                  this.props.verify(this.props.user.email, this.state.code)
                }
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
    color: Colors.secondary,
    marginHorizontal: 14,
  },
  body: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.secondary,
    marginTop: 10,
    marginHorizontal: 30,
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

const mapStateToProps = (state) => ({
  user: state.users.user,
  error: state.users.verifyEmailError,
  loading: state.users.loading,
});

const mapDispatchToProps = {
  verify: verifyEmail,
  hide: hideLoginError,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailScreen);
