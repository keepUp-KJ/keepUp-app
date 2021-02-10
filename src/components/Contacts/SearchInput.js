import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";
import Header from "../Header";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Input from "../Input";

class SearchInput extends React.Component {
  state = {
    searchInput: "",
    filteredContacts: [],
    search: false,
  };

  render() {
    return (
      <>
        <View style={{ ...styles.headerContainer, flex: 0.1 }}>
          {this.state.search ? (
            <View style={styles.searchContainer}>
              <Ionicons
                name="ios-search"
                size={23}
                color={Colors.secondary}
                style={{ flex: 0.1 }}
                onPress={() => {
                  this.setState({
                    search: !this.state.search,
                    searchInput: this.state.search
                      ? ""
                      : this.state.searchInput,
                  });
                  this.props.onSearch(this.state.searchInput);
                }}
              />
              <View style={{ flex: 0.8 }}>
                <Input
                  search
                  searchInput={this.state.searchInput}
                  placeholder="Search..."
                  value={this.state.searchInput}
                  onDeleteSearch={() => {
                    this.setState({ searchInput: "" });
                    this.props.onSearch("");
                  }}
                  onChangeText={(text) => {
                    this.setState({ searchInput: text });
                    this.props.onSearch(text);
                  }}
                />
              </View>
            </View>
          ) : (
            <Header
              leftComponent={
                <TextComp bold style={styles.title}>
                  Contacts
                </TextComp>
              }
              rightComponent={
                <Ionicons
                  name="ios-search"
                  size={23}
                  color={Colors.secondary}
                  onPress={() => {
                    this.setState({ search: !this.state.search });
                  }}
                />
              }
            />
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
});

const mapStateToProps = (state) => ({
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  rejected: state.contacts.rejectedContacts,
});

export default connect(mapStateToProps)(SearchInput);
