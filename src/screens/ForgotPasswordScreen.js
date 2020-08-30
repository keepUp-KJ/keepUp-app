import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/Colors";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { Ionicons } from "@expo/vector-icons";

class ForgotPasswordScreen extends React.Component {
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
            style={{
              flex: 0.1,
              justifyContent: "center",
              paddingLeft: 15,
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

          <View style={{ ...styles.container, flex: 0.2 }}>
            <Text style={styles.title}>FORGOT YOUR PASSWORD?</Text>
            <Text style={styles.body}>
              Confirm your email and we'll send the instructions
            </Text>
          </View>
          {/* Input */}
          <View
            style={{
              ...styles.container,
              flex: 0.05,
              paddingBottom: 30,
            }}
          >
            <View style={{ width: "80%" }}>
              <Input placeholder="Enter email" style={styles.input} />
            </View>
          </View>
          {/* Confirm button */}
          <View style={{ ...styles.container }}>
            <View style={{ width: "60%" }}>
              <Btn
                title="Confirm"
                btnColor={Colors.primaryColor}
                fontSize={14}
                bold
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
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.secondary,
    marginHorizontal: 14,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.secondary,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForgotPasswordScreen;
