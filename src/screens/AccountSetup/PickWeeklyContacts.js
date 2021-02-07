import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Contact from "../../components/Contacts/Contact";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { addContact, removeContact } from "../../store/actions/contacts";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TextComp from "../../components/TextComp";

class PickWeeklyContacts extends React.Component {
  state = {
    filteredContacts: [],
    input: "",
    visible: false,
    activeContact: {},
  };

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
            this.props.navigation.navigate("Home");
          },
        },
      ]
    );

  renderHeader = () => {
    return (
      <TextComp style={styles.text}>
        Pick Contacts that you wish to contact{" "}
        <TextComp
          bold
          style={{
            color: Colors.blue,
            fontSize: 17,
          }}
        >
          WEEKLY
        </TextComp>
      </TextComp>
    );
  };

  render() {
    const contacts = !this.state.input
      ? this.props.contacts
          .filter(
            (contact) =>
              !this.props.dailyContacts.find(
                (item) => item.info.id === contact.info.id
              ) &&
              !this.props.rejectedContacts.find(
                (item) => item.info.id === contact.info.id
              )
          )
          .sort((a, b) => {
            if (a.info.firstName < b.info.firstName) return -1;
            if (a.info.firstName > b.info.firstName) return 1;
          })
      : this.state.filteredContacts.sort((a, b) => {
          if (a.info.firstName < b.info.firstName) return -1;
          if (a.info.firstName > b.info.firstName) return 1;
        });

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Header
            leftComponent={
              <Ionicons
                name="md-arrow-back"
                size={25}
                color={Colors.secondary}
                onPress={() => {
                  this.props.navigation.navigate("PickContacts");
                }}
              />
            }
            centerComponent={
              <View>
                <TextComp bold style={styles.headerText}>
                  PICK CONTACTS
                </TextComp>
                <TextComp
                  bold
                  style={{ ...styles.headerText, color: Colors.blue }}
                >
                  {this.props.weeklyContacts.length} CONTACTS SELECTED
                </TextComp>
              </View>
            }
            rightComponent={
              <TouchableOpacity onPress={this.alert}>
                <TextComp style={styles.text}>Skip</TextComp>
              </TouchableOpacity>
            }
          />
          <View style={{ width: "85%" }}>
            <Input
              search
              searchInput={this.state.input}
              onDeleteSearch={() => {
                const updatedContacts = this.props.contacts.filter(
                  (contact) => {
                    const name = String.prototype.toUpperCase.call(
                      (contact.info.firstName || "") +
                        " " +
                        (contact.info.lastName || "")
                    );

                    const search = String.prototype.toUpperCase.call("");
                    return name.indexOf(search) > -1;
                  }
                );
                this.setState({
                  filteredContacts: updatedContacts,
                  input: "",
                });
              }}
              placeholder="Search..."
              value={this.state.input}
              onChangeText={(text) => {
                const updatedContacts = this.props.contacts.filter(
                  (contact) => {
                    const name = String.prototype.toUpperCase.call(
                      (contact.info.firstName || "") +
                        " " +
                        (contact.info.lastName || "")
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
        {/* CONTACTS */}
        <View style={{ flex: 0.8 }}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            showsVerticalScrollIndicator={false}
            data={contacts}
            keyExtractor={(item) => item.info.id}
            renderItem={(itemData) => (
              <Contact
                frequency="weekly"
                contact={itemData.item}
                addContact={() => {
                  this.props.add(itemData.item, "weekly");
                }}
                removeContact={() => {
                  this.props.remove(itemData.item, "weekly");
                }}
              />
            )}
            numColumns={3}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              this.props.navigation.navigate("PickMonthly");
            }}
          >
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  footer: {
    flex: 0.1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    width: "100%",
  },
  btnContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  dailyContacts: state.contacts.dailyContacts,
  weeklyContacts: state.contacts.weeklyContacts,
  rejectedContacts: state.contacts.rejectedContacts,
});

const mapDispatchToProps = {
  add: addContact,
  remove: removeContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickWeeklyContacts);
