import React from "react";
import { SafeAreaView, View } from "react-native";

//Redux
import { connect } from "react-redux";
import { getContactDecisions } from "../store/actions/contacts";

// Components
import Menu from "../components/Contacts/Menu";
import ContactsList from "../components/ContactsList";
import TabNav from "../components/Tab/TabNav";

class ContactsScreen extends React.Component {
  state = {
    activeTab: "Accepted",
    loading: true,
    filteredContacts: [],
    searchInput: "",
  };

  componentDidMount() {
    this.props.get(this.props.user._id, this.props.user.token);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
        <View style={{ flex: 0.92 }}>
          <Menu
            onChange={(activeTab) => this.setState({ activeTab })}
            onSearch={(filteredContacts, searchInput) => {
              this.setState({ filteredContacts, searchInput });
            }}
          />
          <ContactsList
            activeTab={this.state.activeTab}
            searchInput={this.state.searchInput}
            filteredContacts={this.state.filteredContacts}
          />
        </View>
        <TabNav active="contacts" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  rejected: state.contacts.rejectedContacts,
});

const mapDispatchToProps = {
  get: getContactDecisions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
