import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../../components/TextComp";

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
            <TextComp bold style={styles.title}>
              Profile
            </TextComp>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.labelContainer}>
            <TextComp style={styles.label}>First Name</TextComp>
            <TextComp style={styles.text}>Khaled</TextComp>
          </View>
          <View style={styles.labelContainer}>
            <TextComp style={styles.label}>Last Name</TextComp>
            <TextComp style={styles.text}>Magued</TextComp>
          </View>
          <View style={styles.labelContainer}>
            <TextComp style={styles.label}>Email</TextComp>
            <TextComp style={styles.text}>{this.props.user.email}</TextComp>
          </View>
          <View style={styles.labelContainer}>
            <TextComp style={styles.label}>Mobile</TextComp>
            <TextComp style={styles.text}>01063795325</TextComp>
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
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
    marginHorizontal: 30,
  },
  label: {
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
