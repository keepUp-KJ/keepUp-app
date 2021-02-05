import React from "react";
import { SafeAreaView, View } from "react-native";

// Components
import DateHeader from "../components/Home/DateHeader";
import RemindersList from "../components/Home/RemindersList";
import TabNav from "../components/Tab/TabNav";

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
