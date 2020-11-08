import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import * as Contacts from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Menu from "../components/Menu";
import RejectedContact from "../components/RejectedContact";
import { connect } from "react-redux";
import ContactCard from "../components/ContactCard";
import {
  moveToPending,
  acceptContact,
  rejectContact,
  unrejectContact,
  getContacts,
} from "../store/actions/contacts";

class ContactsScreen extends React.Component {
  state = {
    searchInput: "",
    activeTab: "Accepted",
    visible: false,
    contacts: [],
    activeContact: {},
  };

  async componentDidMount() {
    this.props.get(this.props.user._id);

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.ID,
        Contacts.Fields.Birthday,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.PhoneticFirstName,
      ],
    });

    this.setState({ contacts: data });
  }

  renderContact = (itemData) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => {
        this.setState({ visible: true, activeContact: itemData.item });
      }}
    >
      <Text style={styles.text}>
        {itemData.item.firstName + " " + itemData.item.lastName}
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
                this.props.unreject(itemData.item).then(() => {
                  this.setState({
                    rejected: this.props.rejectedContacts,
                    pending: this.state.contacts.filter(
                      (item) =>
                        this.state.accepted.findIndex(
                          (contact) => contact.id === item.id
                        ) === -1 &&
                        this.props.rejectedContacts.findIndex(
                          (contact) => contact.id === item.id
                        ) === -1
                    ),
                  });
                });
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
        <View style={{ ...styles.headerContainer, flex: rejected ? 0.1 : 0.2 }}>
          <Header
            leftComponent={
              <Ionicons
                name="md-arrow-back"
                size={30}
                color={Colors.secondary}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
            }
            centerComponent={<Text style={styles.title}>CONTACTS</Text>}
          />
          {rejected ? null : (
            <View style={{ width: "85%" }}>
              <Input
                placeholder="Search..."
                value={this.state.searchInput}
                onChangeText={(text) => {
                  const updatedContacts = this.state.contacts.filter(
                    (contact) => {
                      const name = String.prototype.toUpperCase.call(
                        (contact.firstName || "") +
                          " " +
                          (contact.lastName || "")
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
          )}
        </View>

        <View
          style={{
            flex: rejected ? 0.8 : 0.7,
            alignItems: rejected ? null : "center",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            key={accepted || pending ? "1" : "0"}
            data={
              accepted
                ? this.props.acceptedContacts
                : rejected
                ? this.props.rejectedContacts
                : pending
                ? this.state.contacts
                : null
            }
            renderItem={
              rejected ? this.renderRejectedContact : this.renderContact
            }
            numColumns={accepted || pending ? 3 : null}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
          <Menu
            active={this.state.activeTab}
            onChange={(activeTab) => {
              this.setState({ activeTab });
            }}
          />
        </View>
        {Dimensions.get("window").height > 850 ? (
          <View
            style={{
              backgroundColor: Colors.primaryColor,
              marginBottom: 0,
              padding: 10,
              marginBottom: -40,
            }}
          />
        ) : null}
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
    fontSize: 20,
    fontFamily: "Futura",
    color: Colors.primaryColor,
    fontWeight: "700",
  },
  card: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#C3C4C4",
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
  acceptedContacts: state.contacts.acceptedContacts,
  rejectedContacts: state.contacts.rejectedContacts,
});

const mapDispatchToProps = {
  accept: acceptContact,
  reject: rejectContact,
  get: getContacts,
  move: moveToPending,
  unreject: unrejectContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
