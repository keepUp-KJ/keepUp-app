import React from "react";
import { SafeAreaView, View, BackHandler } from "react-native";

// Components
import SearchInput from "../components/Contacts/SearchInput";
import ContactsList from "../components/Contacts/ContactsList";
import TabNav from "../components/Tab/TabNav";

class ContactsScreen extends React.Component {
  state = {
    activeTab: 0,
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
          <SearchInput
            onSearch={(searchInput) => {
              this.setState({ searchInput });
            }}
          />
          <ContactsList searchInput={this.state.searchInput} />
        </View>
        <TabNav active="contacts" />
      </SafeAreaView>
    );
  }
}

export default ContactsScreen;
