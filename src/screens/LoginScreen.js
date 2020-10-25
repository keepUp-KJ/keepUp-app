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
import {
  login,
  loginWithFacebook,
  loginWithGoogle,
  hideLoginError,
} from "../store/actions/users";
import { connect } from "react-redux";

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };

  componentDidMount() {
    this.props.hide();
  }

  loginWithGoogle = () => {
    this.props.googleSignIn().then(() => {
      this.props.navigation.navigate("PickContacts");
    });
  };

  loginWithFacebook = () => {
    this.props.facebookSignIn().then((res) => {
      if (this.props.token) {
        this.props.navigation.navigate("PickContacts");
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
              onChangeText={(email) => {
                this.props.hide();
                this.setState({ email });
              }}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              value={this.state.password}
              onChangeText={(password) => {
                this.props.hide();
                this.setState({ password });
              }}
              secureTextEntry
              placeholder="Password"
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
            <Text style={styles.errorText}>{this.props.error}</Text>
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
                this.setState({ loading: true });
                this.props
                  .login(this.state.email, this.state.password)
                  .then(() => {
                    this.setState({ loading: false });
                  });
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

const mapStateToProps = (state) => ({
  token: state.users.token,
  error: state.users.loginError,
});

const mapDispatchToProps = {
  googleSignIn: loginWithGoogle,
  facebookSignIn: loginWithFacebook,
  login,
  hide: hideLoginError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
