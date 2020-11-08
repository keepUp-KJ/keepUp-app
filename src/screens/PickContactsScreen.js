import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import Contact from "../components/Contact";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Header from "../components/Header";
import Btn from "../components/Btn";
import { connect } from "react-redux";
import {
  acceptContact,
  rejectContact,
  skipPicking,
} from "../store/actions/contacts";

class PickContactsScreen extends React.Component {
  state = {
    contacts: [],
    filteredContacts: [],
    input: "",
  };

  async componentDidMount() {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.ID,
          Contacts.Fields.Birthday,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      this.setState({ contacts: data });
    }
  }

  alert = () =>
    Alert.alert(
      "Are you sure?",
      "We won't be able to set up your account without picking contacts",
      [
        { text: "Cancel", style: "default" },
        {
          text: "Skip",
          style: "cancel",
          onPress: () => {
            this.props.skip().then(() => {
              this.props.navigation.navigate("Home");
            });
          },
        },
      ]
    );

  renderContact = (itemData) => (
    <Contact
      contact={itemData.item}
      onAccept={() => this.props.accept(this.props.user._id, itemData.item)}
      onReject={() => this.props.reject(this.props.user._id, itemData.item)}
    />
  );

  render() {
    const contacts = !this.state.input
      ? this.state.contacts.sort((a, b) => {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
        })
      : this.state.filteredContacts.sort((a, b) => {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
        });

    return (
      <SafeAreaView style={styles.screen}>
        {/* HEADER + SEARCH INPUT */}
        <View style={styles.container}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text}>PICK CONTACTS</Text>
                <Text style={{ ...styles.text, color: Colors.primaryColor }}>
                  {this.props.acceptedContacts.length} CONTACTS SELECTED
                </Text>
              </View>
            }
            rightComponent={
              <TouchableOpacity onPress={this.alert}>
                <Text style={styles.text}>Skip</Text>
              </TouchableOpacity>
            }
          />
          <View style={{ width: "85%" }}>
            <Input
              placeholder="Search..."
              value={this.state.input}
              onChangeText={(text) => {
                const updatedContacts = this.state.contacts.filter(
                  (contact) => {
                    const name = String.prototype.toUpperCase.call(
                      (contact.firstName || "") + " " + (contact.lastName || "")
                    );

                    const search = String.prototype.toUpperCase.call(text);
                    return name.indexOf(search) > -1;
                  }
                );
                this.setState({
                  filteredContacts: updatedContacts,
                  input: text,
                });
              }}
            />
          </View>
        </View>

        {/* CONTACTS + DONE BUTTON*/}
        <View style={{ flex: 0.9 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={this.renderContact}
            numColumns={3}
          />
          {this.props.acceptedContacts.length === 0 ? null : (
            <View style={{ alignItems: "center" }}>
              <Btn
                title="Done"
                btnColor={Colors.primaryColor}
                style={{ position: "absolute", width: "50%", marginTop: -80 }}
                onPress={() => {
                  this.props.navigation.navigate("Setup");
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Futura",
    fontWeight: "bold",
    color: Colors.secondary,
  },
  container: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Futura",
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "700",
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
  skip: skipPicking,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickContactsScreen);
