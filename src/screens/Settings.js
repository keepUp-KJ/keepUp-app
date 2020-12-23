import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Octicons, Ionicons } from "@expo/vector-icons";
import TabNav from "../components/TabNav";
import { connect } from "react-redux";
import { signout } from "../store/actions/users";

class Settings extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.text}>Settings</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("General");
            }}
          >
            <View style={{ ...styles.icon, backgroundColor: Colors.secondary }}>
              <Octicons name="settings" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>General</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("Notifications");
            }}
          >
            <View style={{ ...styles.icon, backgroundColor: Colors.blue }}>
              <Octicons name="bell" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            <View style={styles.icon}>
              <Octicons name="person" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
              this.props.signout();
            }}
          >
            <View style={{ ...styles.icon, backgroundColor: Colors.tomato }}>
              <Ionicons name="ios-exit" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <TabNav active="settings" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  body: {
    flex: 0.72,
    marginHorizontal: 30,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 20,
  },
  icon: {
    padding: 10,
    width: 50,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: Colors.primaryColor,
  },
  iconText: {
    fontFamily: "Futura",
    fontSize: 16,
  },
  text: {
    fontFamily: "Futura",
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
  },
});

const mapDispatchToProps = {
  signout,
};

export default connect(null, mapDispatchToProps)(Settings);
