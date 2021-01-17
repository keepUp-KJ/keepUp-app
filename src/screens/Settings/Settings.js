import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Octicons, Ionicons } from "@expo/vector-icons";
import TabNav from "../../components/Tab/TabNav";
import { connect } from "react-redux";
import { signout } from "../../store/actions/users";
import TextComp from "../../components/TextComp";

class Settings extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TextComp bold style={styles.text}>
            Settings
          </TextComp>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("General");
            }}
          >
            <View style={{ ...styles.icon, backgroundColor: Colors.babyBlue }}>
              <Octicons name="settings" size={30} color="white" />
            </View>
            <TextComp style={styles.iconText}>General</TextComp>
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
            <TextComp style={styles.iconText}>Notifications</TextComp>
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
            <TextComp style={styles.iconText}>Profile</TextComp>
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
            <TextComp style={styles.iconText}>Logout</TextComp>
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
    marginVertical: 15,
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
    fontSize: 16,
  },
  text: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
  },
});

const mapDispatchToProps = {
  signout,
};

export default connect(null, mapDispatchToProps)(Settings);
