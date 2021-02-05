import React from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getReminders } from "../store/actions/reminders";
import { Ionicons } from "@expo/vector-icons";

class ReloadBtn extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.getReminders(this.props.user._id, this.props.user.token);
        }}
      >
        <Ionicons name="ios-refresh" size={25} />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  getReminders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReloadBtn);
