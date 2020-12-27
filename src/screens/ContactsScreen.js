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
} from "../store/actions/contacts";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import TextComp from "../components/TextComp";

class ContactsScreen extends React.Component {
  state = {
    searchInput: "",
    activeTab: "Accepted",
    visible: false,
    activeContact: null,
    search: false,
    filteredContacts: [],
    loading: true,
    pendingContact: null,
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
          pendingContact: itemData.item,
          activeContact:
            this.state.activeTab === "Pending"
              ? itemData.item.contact
              : itemData.item,
        });
      }}
    >
      <TextComp style={styles.text}>
        {this.state.activeTab === "Pending"
          ? itemData.item.contact.firstName +
            " " +
            (itemData.item.contact.lastName || "")
          : itemData.item.firstName + " " + (itemData.item.lastName || "")}
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
                  this.state.pendingContact,
                  frequency
                )
                .then(() => {
                  this.setState({
                    visible: false,
                  });
                });
            }}
            onReject={() => {}}
            onEdit={(frequency, notify) => {
              this.props.edit(this.state.activeContact._id, frequency, notify);
            }}
            pending={pending}
            accepted={accepted}
            visible={this.state.visible}
            contact={this.state.activeContact}
            close={() => this.setState({ visible: false, activeContact: null })}
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
                      : null;
                    const updatedContacts = currentList.filter((contact) => {
                      const contactInfo = pending ? contact.contact : contact;

                      const name = String.prototype.toUpperCase.call(
                        (contactInfo.firstName || "") +
                          " " +
                          (contactInfo.lastName || "")
                      );

                      const search = String.prototype.toUpperCase.call(text);
                      return name.indexOf(search) > -1;
                    });
                    this.setState({
                      filteredContacts: updatedContacts,
                      searchInput: text,
                    });
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
            }}
          />
        </View>
        <View
          style={{
            flex: 0.75,
            alignItems: rejected ? null : "center",
          }}
        >
          {this.props.loading ? (
            <ActivityIndicator color={Colors.primaryColor} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              key={accepted || pending ? "1" : "0"}
              data={
                this.state.searchInput
                  ? this.state.filteredContacts
                  : accepted
                  ? this.props.accepted
                  : pending
                  ? this.props.pending
                  : null
              }
              renderItem={
                rejected ? this.renderRejectedContact : this.renderContact
              }
              numColumns={accepted || pending ? 3 : null}
              keyExtractor={(item) => (pending ? item.contact.id : item._id)}
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
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
  },
  text: {
    textAlign: "center",
    color: Colors.secondary,
    fontSize: 14,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  loading: state.contacts.loading,
});

const mapDispatchToProps = {
  get: getContactDecisions,
  sync: syncContacts,
  edit: editContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
