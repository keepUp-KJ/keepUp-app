import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "../components/SettingsItem";

class GeneralSettings extends React.Component {
  state = {
    birthday: false,
    dailyCalls: false,
    incompleteTask: false,
  };
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
            style={{
              flex: 0.6,
              marginHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.text}>General</Text>
          </View>
        </View>
        <View style={styles.body}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    backgroundColor: Colors.secondary,
    marginTop: -50,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
