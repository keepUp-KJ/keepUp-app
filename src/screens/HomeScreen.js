import React from "react";
import { SafeAreaView, ActivityIndicator, View } from "react-native";
import * as Notifications from "expo-notifications";

// Components
import DateHeader from "../components/DateHeader";
import RemindersList from "../components/RemindersList";
import TabNav from "../components/Tab/TabNav";
import Colors from "../constants/Colors";

//Redux
import { connect } from "react-redux";
import { getReminders, setCompleted } from "../store/actions/reminders";

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, marginTop: 30, backgroundColor: "white" }}
      >
        <View style={{ flex: 0.92 }}>
          <DateHeader />

          <RemindersList
            data={this.props.reminders}
            onComplete={(itemData) => {
              this.props.complete(itemData.item._id, this.props.user.token);
            }}
          />
        </View>
        <TabNav active="home" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  reminders: state.reminders.todayReminders,
});

const mapDispatchToProps = {
  get: getReminders,
  complete: setCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
