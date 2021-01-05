import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import TabNav from "../components/Tab/TabNav";
import Menu from "../components/Contacts/Menu";
import Input from "../components/Input";
import RejectedContact from "../components/Contacts/RejectedContact";
import { connect } from "react-redux";
import ContactCard from "../components/Contacts/ContactCard";
import {
  getContactDecisions,
  syncContacts,
  editContact,
  acceptContact,
  rejectContact,
} from "../store/actions/contacts";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import TextComp from "../components/TextComp";
import { Dimensions } from "react-native";

class ContactsScreen extends React.Component {
  state = {
    searchInput: "",
    activeTab: "Accepted",
    visible: false,
    activeContact: null,
    search: false,
    filteredContacts: [],
    loading: true,
  };

  componentDidMount() {
    this.props.sync();
    this.props.get(this.props.user._id);
  }

  renderContact = (itemData) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => {
        this.setState({
          visible: true,
          activeContact: itemData.item,
        });
      }}
    >
      <TextComp style={styles.text}>
        {itemData.item.info.firstName} {itemData.item.info.lastName}
      </TextComp>
    </TouchableOpacity>
  );

  renderRejectedContact = (itemData) => (
    <RejectedContact
      contact={itemData.item}
      onPress={() =>
        Alert.alert(
          "Are you sure?",
          "By accepting to unreject, this contact will go back to your pending list",
          [
            {
              text: "Okay",
              onPress: () => {
                this.props.unreject(itemData.item);
              },
            },
            {
              text: "Cancel",
              style: "destructive",
            },
          ]
        )
      }
    />
  );

  search = (currentList, text) => {
    const updatedContacts = currentList.filter((contact) => {
      const name = String.prototype.toUpperCase.call(
        (contact.info.firstName || "") + " " + (contact.info.lastName || "")
      );

      const search = String.prototype.toUpperCase.call(text);
      return name.indexOf(search) > -1;
    });

    this.setState({
      filteredContacts: updatedContacts,
      searchInput: text,
    });
  };

  render() {
    const accepted = this.state.activeTab === "Accepted";
    const rejected = this.state.activeTab === "Rejected";
    const pending = this.state.activeTab === "Pending";

    return (
      <SafeAreaView style={styles.screen}>
        {this.state.activeContact !== null && (
          <ContactCard
            onAccept={(frequency) => {
              this.props
                .accept(
                  this.props.user._id,
                  this.state.activeContact,
                  frequency
                )
                .then(() => {
                  this.setState({
                    visible: false,
                    activeContact: null,
                  });
                });
            }}
            onReject={() => {
              this.props
                .reject(this.props.user._id, this.state.activeContact)
                .then(() => {
                  this.setState({
                    visible: false,
                    activeContact: null,
                  });
                });
            }}
            onEdit={(frequency, notify) => {
              this.props.edit(this.state.activeContact._id, frequency, notify);
            }}
            pending={pending}
            accepted={accepted}
            rejected={rejected}
            visible={this.state.visible}
            contact={this.state.activeContact}
            close={() =>
              this.setState({
                visible: false,
                activeContact: null,
              })
            }
          />
        )}
        <View style={{ ...styles.headerContainer, flex: 0.08 }}>
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
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder="Search..."
                  value={this.state.searchInput}
                  onChangeText={(text) => {
                    const currentList = pending
                      ? this.props.pending
                      : accepted
                      ? this.props.accepted
                      : this.props.rejected;

                    this.search(currentList, text);
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
        <View style={{ flex: 0.11 }}>
          <Menu
            active={this.state.activeTab}
            onChange={(activeTab) => {
              this.setState({ activeTab });
              if (this.state.searchInput) {
                const currentList =
                  activeTab === "Pending"
                    ? this.props.pending
                    : activeTab === "Accepted"
                    ? this.props.accepted
                    : this.props.rejected;
                this.search(currentList, this.state.searchInput);
              }
            }}
          />
        </View>
        <View
          style={{
            flex: 0.75,
            alignItems: this.props.loading ? "center" : "flex-start",
            marginHorizontal: 20,
            // marginHorizontal: Dimensions.get("window").width / 11,
          }}
        >
          {this.props.loading ? (
            <ActivityIndicator color={Colors.primaryColor} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={
                this.state.searchInput
                  ? this.state.filteredContacts
                  : accepted
                  ? this.props.accepted
                  : pending
                  ? this.props.pending
                  : rejected
                  ? this.props.rejected
                  : null
              }
              renderItem={this.renderContact}
              numColumns={3}
              keyExtractor={(item) => item.info.id}
            />
          )}
        </View>
        <TabNav active="contacts" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  card: {
    height: Dimensions.get("window").width / 3.7,
    width: Dimensions.get("window").width / 3.7,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
    color: Colors.secondary,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  rejected: state.contacts.rejectedContacts,
  loading: state.contacts.loading,
});

const mapDispatchToProps = {
  accept: acceptContact,
  get: getContactDecisions,
  sync: syncContacts,
  edit: editContact,
  reject: rejectContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
