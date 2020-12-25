import React from "react";
import { connect } from "react-redux";
import { tryLocalSignin } from "../../store/actions/users";

class LoadingScreen extends React.Component {
  componentDidMount = () => {
    this.props.localSignin();
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  localSignin: tryLocalSignin,
};

export default connect(null, mapDispatchToProps)(LoadingScreen);
