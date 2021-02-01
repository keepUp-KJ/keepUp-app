import React from "react";
import {
  View,
  StyleSheet,
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
import TextComp from "../../components/TextComp";
import { ScrollView } from "react-native-gesture-handler";

class SignupScreen extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
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
          <View
            style={{
              justifyContent: "center",
              paddingLeft: 15,
              marginVertical: 20,
            }}
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
          <View style={{ ...styles.container, marginBottom: 30 }}>
            <TextComp bold style={styles.title}>
              CREATE{"\n"}ACCOUNT
            </TextComp>
          </View>

          {/* Inputs */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={{ width: "80%" }}>
                <Input
                  auto
                  value={this.state.firstName}
                  onChangeText={(firstName) => {
                    this.setState({ firstName });
                  }}
                  title="First Name"
                  placeholder="First Name"
                  autoCorrect={false}
                />
                <Input
                  value={this.state.lastName}
                  onChangeText={(lastName) => {
                    this.setState({ lastName });
                  }}
                  title="Last Name"
                  placeholder="Last Name"
                  autoCorrect={false}
                />
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
                  value={this.state.mobile}
                  onChangeText={(mobile) => {
                    this.setState({ mobile });
                  }}
                  title="Mobile"
                  placeholder="Mobile"
                  autoCorrect={false}
                  keyboardType="numeric"
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
                      this.state.firstName,
                      this.state.lastName,
                      this.state.mobile,
                      this.state.password,
                      this.state.confPassword
                    );
                  }}
                />
              </View>

              <TextComp style={styles.termsText}>
                By creating an account you agree to our terms of service and
                privacy policy
              </TextComp>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: Colors.secondary,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  termsText: {
    textAlign: "center",
    marginHorizontal: 40,
    fontSize: 12,
    width: "60%",
    color: Colors.secondary,
    marginVertical: 20,
    marginBottom: 200,
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
