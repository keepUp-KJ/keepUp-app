import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";
import TabNav from "../components/TabNav";
import Colors from "../constants/Colors";

class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Header centerComponent={<Text style={styles.text}></Text>} />
        </View>
        <View style={styles.body}></View>
        <TabNav active="profile" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.07,
    justifyContent: "center",
  },
  body: {
    flex: 0.85,
  },
  text: {
    fontSize: 20,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default ProfileScreen;
