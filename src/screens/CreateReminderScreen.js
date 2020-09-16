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
import moment from "moment";

class CreateRemiderScreen extends React.Component {
  state = {};

  render() {
    var today = moment().format("MMMM DD");

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
                this.props.navigation.navigate("Home");
              }}
            />
          </View>

          {/* Header */}
          <View style={{ ...styles.container, flex: 0.15 }}>
            <Text style={styles.title}>ADD{"\n"}REMINDER</Text>
          </View>

          {/* Inputs */}
          <View style={{ ...styles.container, flex: 0.5 }}>
            <View style={{ width: "60%" }}>
              <Input
                value={today}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.secondary, fontWeight: "700" }}
              />
              <Input
                placeholder="Enter contact name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input placeholder="Enter occasion" autoCorrect={false} />
              <Input placeholder="On the same day" autoCorrect={false} />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={{ width: "70%" }}>
              <Btn
                title="Create"
                btnColor={Colors.primaryColor}
                fontSize={12}
                loading={this.state.loading}
                bold
                textColor="white"
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
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.primaryColor,
    fontFamily: "Futura",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.15,
  },
});
export default CreateRemiderScreen;
