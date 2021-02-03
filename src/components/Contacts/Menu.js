import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";
import Header from "../Header";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Input from "../Input";

class Menu extends React.Component {
  state = {
    active: "Accepted",
    searchInput: "",
    filteredContacts: [],
    search: false,
  };

  STATUS = ["Accepted", "Pending", "Rejected"];

  search = (currentList, text) => {
    const updatedContacts = currentList.filter((contact) => {
      const name = String.prototype.toUpperCase.call(
        (contact.info.firstName || "") + " " + (contact.info.lastName || "")
      );

      const search = String.prototype.toUpperCase.call(text);
      return name.indexOf(search) > -1;
    });

    this.props.onSearch(updatedContacts, text);

    this.setState({
      filteredContacts: updatedContacts,
      searchInput: text,
    });
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
                  this.setState({ search: !this.state.search });
                }}
              />
              <View style={{ flex: 0.8 }}>
                <Input
                  placeholder="Search..."
                  value={this.state.searchInput}
                  onChangeText={(text) => {
                    const currentList =
                      this.state.active === "Pending"
                        ? this.props.pending
                        : this.state.active === "Accepted"
                        ? this.props.accepted
                        : this.props.rejected;
                    this.search(currentList, text);
                  }}
                  onBlur={() => {
                    Keyboard.dismiss();
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
        <View style={styles.container}>
          {this.STATUS.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.menuItem,
                borderBottomWidth: this.state.active === item ? 3 : 0,
              }}
            >
              <TextComp
                style={styles.text}
                bold={this.state.active === item}
                onPress={() => {
                  this.props.onChange(item);
                  this.setState({ active: item });
                  if (this.state.searchInput) {
                    const currentList =
                      item === "Pending"
                        ? this.props.pending
                        : item === "Accepted"
                        ? this.props.accepted
                        : this.props.rejected;
                    this.search(currentList, this.state.searchInput);
                  }
                }}
              >
                {item === "Accepted"
                  ? "FRIENDS"
                  : item === "Rejected"
                  ? "BLACKLIST"
                  : item.toUpperCase()}
              </TextComp>
            </View>
          ))}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  menuItem: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: Colors.secondary,
    borderBottomColor: Colors.primaryColor,
  },
  text: {
    color: Colors.secondary,
    fontSize: 13,
  },
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

export default connect(mapStateToProps)(Menu);
