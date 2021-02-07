import React from "react";
import { SafeAreaView, View, BackHandler } from "react-native";

//Components & Constants
import Colors from "../../constants/Colors";
import TabNav from "../../components/Tab/TabNav";
import Header from "../../components/Settings/Header";
import SettingsIcon from "../../components/Settings/SettingsIcon";

//Redux
import { connect } from "react-redux";
import { signout } from "../../store/actions/users";

class Settings extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.navigate("Home");
    return true;
  };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}
      >
        <Header />
        <View style={{ flex: 0.72, marginHorizontal: 30 }}>
          <SettingsIcon
            title="General"
            iconName="settings"
            color={Colors.babyBlue}
            onPress={() => {
              this.props.navigation.navigate("General");
            }}
          />
          <SettingsIcon
            title="Notifications"
            iconName="bell"
            color={Colors.blue}
            onPress={() => {
              this.props.navigation.navigate("Notifications");
            }}
          />
          <SettingsIcon
            title="Profile"
            iconName="person"
            color={Colors.primaryColor}
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          />
          <SettingsIcon
            title="Logout"
            ionicons
            iconName="ios-exit"
            color={Colors.tomato}
            onPress={() => {
              this.props.signout();
            }}
          />
        </View>
        <TabNav active="settings" />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  signout,
};

export default connect(null, mapDispatchToProps)(Settings);
