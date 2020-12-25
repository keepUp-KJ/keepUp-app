import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

class ProfileScreen extends React.Component {
  state = {
    birthday: false,
    dailyCalls: false,
    incompleteTask: false,
  };

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
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.text}>Khaled</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.text}>Magued</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{this.props.user.email}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.text}>01063795325</Text>
          </View>
        </View>
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
    backgroundColor: Colors.primaryColor,
    marginTop: -50,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "Futura",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
    marginHorizontal: 30,
  },
  label: {
    fontFamily: "Futura",
    fontSize: 16,
    color: Colors.primaryColor,
    marginBottom: 5,
  },
  labelContainer: {
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
