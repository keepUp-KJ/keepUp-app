import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

//Components & Constants
import Colors from "../../constants/Colors";
import Header from "../../components/Settings/Header";
import ProfileItem from "../../components/Settings/ProfileItem";

//Redux
import { connect } from "react-redux";

class ProfileScreen extends React.Component {
  render() {
    return (
      <>
        <SafeAreaView style={{ backgroundColor: Colors.primaryColor }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Header color={Colors.primaryColor} title="Profile" />
          <ScrollView style={{ flex: 0.7, marginHorizontal: 20 }}>
            <ProfileItem title="First Name" data={this.props.user.firstName} />
            <ProfileItem title="Last Name" data={this.props.user.lastName} />
            <ProfileItem title="Email" data={this.props.user.email} />
            <ProfileItem title="Mobile" data={this.props.user.mobile} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(ProfileScreen);
