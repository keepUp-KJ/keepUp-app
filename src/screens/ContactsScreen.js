import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import TabNav from "../components/TabNav";
import Menu from "../components/Menu";
import Input from "../components/Input";
import RejectedContact from "../components/RejectedContact";
import { connect } from "react-redux";
import ContactCard from "../components/ContactCard";
import {
  acceptContact,
  rejectContact,
  getContactDecisions,
  syncContacts,
} from "../store/actions/contacts";
import { Ionicons } from "@expo/vector-icons";

class ContactsScreen extends React.Component {
  state = {
    searchInput: "",
    activeTab: "Accepted",
    visible: false,
    activeContact: {},
    search: false,
    filteredContacts: [],
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
        this.setState({ visible: true, activeContact: itemData.item.contact });
      }}
    >
      <Text style={styles.text}>
        {itemData.item.contact.firstName +
          " " +
          (itemData.item.contact.lastName || "")}
      </Text>
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
        <ContactCard
          onAccept={() => {}}
          onReject={() => {}}
          pending={pending}
          accepted={accepted}
          visible={this.state.visible}
          contact={this.state.activeContact}
          close={() => this.setState({ visible: false, contact: {} })}
        />
        <View style={{ ...styles.headerContainer, flex: 0.07 }}>
          <Header
            centerComponent={<Text style={styles.title}>Contacts</Text>}
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
        </View>
        <View style={{ flex: 0.15 }}>
          {this.state.search ? (
            <View style={{ width: "85%", alignSelf: "center" }}>
              <Input
                placeholder="Search..."
                value={this.state.searchInput}
                onChangeText={(text) => {
                  const updatedContacts = this.props.contacts.filter(
                    (contact) => {
                      const name = String.prototype.toUpperCase.call(
                        (contact.contact.firstName || "") +
                          " " +
                          (contact.contact.lastName || "")
                      );

                      const search = String.prototype.toUpperCase.call(text);
                      return name.indexOf(search) > -1;
                    }
                  );
                  this.setState({
                    filteredContacts: updatedContacts,
                    searchInput: text,
                  });
                }}
              />
            </View>
          ) : null}

          <Menu
            active={this.state.activeTab}
            onChange={(activeTab) => {
              this.setState({ activeTab });
            }}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: rejected ? null : "center",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            key={accepted || pending ? "1" : "0"}
            data={
              this.state.searchInput
                ? this.state.filteredContacts
                : accepted
                ? this.props.accepted
                : rejected
                ? this.props.rejected
                : pending
                ? this.props.pending
                : null
            }
            renderItem={
              rejected ? this.renderRejectedContact : this.renderContact
            }
            numColumns={accepted || pending ? 3 : null}
            keyExtractor={(item) => item.contact.id}
          />
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
    fontSize: 18,
    fontFamily: "Futura",
    color: Colors.secondary,
  },
  card: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#e6e6e6",
  },
  text: {
    textAlign: "center",
    fontFamily: "Futura",
    color: Colors.secondary,
    fontSize: 14,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  accepted: state.contacts.acceptedContacts,
  rejected: state.contacts.rejectedContacts,
  pending: state.contacts.pendingContacts,
});

const mapDispatchToProps = {
  accept: acceptContact,
  reject: rejectContact,
  get: getContactDecisions,
  sync: syncContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
