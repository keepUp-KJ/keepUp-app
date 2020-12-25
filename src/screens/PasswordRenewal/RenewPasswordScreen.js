import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import { connect } from "react-redux";
import { renewPassword } from "../../store/actions/users";
import TextComp from "../../components/TextComp";

class RenewPasswordScreen extends React.Component {
  state = {
    password: "",
    confPassword: "",
  };

  render() {
    const email = this.props.navigation.getParam("email");

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
              <TextComp
                name="md-arrow-back"
                size={30}
                style={{ color: Colors.secondary, fontFamily: "Futura" }}
              >
                Cancel
              </TextComp>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={{ ...styles.container, flex: 0.2 }}>
            <TextComp bold style={styles.title}>
              RENEW PASSWORD
            </TextComp>
            <TextComp style={styles.body}>
              Enter new password for your account{" "}
            </TextComp>
          </View>

          {/* Input */}
          <View style={{ ...styles.container, flex: 0.15, paddingBottom: 30 }}>
            <View style={{ ...styles.input, width: "80%" }}>
              <Input
                placeholder="Password"
                secureTextEntry
                style={{ ...styles.input }}
                value={this.state.password}
                autoCorrect={false}
                onChangeText={(password) => {
                  this.setState({ password });
                }}
              />
            </View>

            <View style={{ ...styles.input, width: "80%" }}>
              <Input
                autoCorrect={false}
                placeholder="Confirm Password"
                secureTextEntry
                style={{ ...styles.input }}
                value={this.state.confPassword}
                onChangeText={(confPassword) => {
                  this.setState({ confPassword });
                }}
              />
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
                  this.props.renew(
                    email,
                    this.state.password,
                    this.state.confPassword
                  );
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
    color: Colors.secondary,
    marginHorizontal: 14,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.secondary,
    marginTop: 10,
    marginHorizontal: 70,
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
});

const mapDispatchToProps = {
  renew: renewPassword,
};

export default connect(null, mapDispatchToProps)(RenewPasswordScreen);
