import React from "react";
import { connect } from "react-redux";
import { tryLocalSignin } from "../../store/actions/users";
import { syncContacts } from "../../store/actions/contacts";

class LoadingScreen extends React.Component {
  componentDidMount = () => {
    this.props.localSignin().then(() => {
      if (this.props.user) {
        this.props.sync();
      }
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  localSignin: tryLocalSignin,
  sync: syncContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
