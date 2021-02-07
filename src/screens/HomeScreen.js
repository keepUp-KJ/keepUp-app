import React from "react";
import { SafeAreaView, View } from "react-native";

// Components
import Header from "../components/Home/Header";
import RemindersList from "../components/Home/RemindersList";
import TabNav from "../components/Tab/TabNav";

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, marginTop: 30, backgroundColor: "white" }}
      >
        <View style={{ flex: 0.92 }}>
          <Header />
          <RemindersList />
        </View>
        <TabNav active="home" />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
