import React from "react";
import { SafeAreaView, View, BackHandler } from "react-native";

// Components
import Menu from "../components/Contacts/Menu";
import ContactsList from "../components/Contacts/ContactsList";
import TabNav from "../components/Tab/TabNav";

class ContactsScreen extends React.Component {
  state = {
    activeTab: "Accepted",
    loading: true,
    filteredContacts: [],
    searchInput: "",
  };

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
        style={{ flex: 1, marginTop: 30, backgroundColor: "white" }}
      >
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

export default ContactsScreen;
