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
import Contact from "../../components/Contacts/Contact";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { connect } from "react-redux";
import {
  syncContacts,
  addContact,
  removeContact,
} from "../../store/actions/contacts";
import { MaterialIcons } from "@expo/vector-icons";

class PickContactsScreen extends React.Component {
  state = {
    filteredContacts: [],
    input: "",
    visible: false,
    activeContact: {},
  };

  componentDidMount() {
    const back = this.props.navigation.getParam("back");
    if (!back) {
      this.props.sync();
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
            this.props.navigation.navigate("Home");
          },
        },
      ]
    );

  renderHeader = () => {
    return (
      <Text style={styles.text}>
        Pick Contacts that you wish to contact{" "}
        <Text
          style={{
            fontWeight: "700",
            color: Colors.primaryColor,
            fontSize: 17,
          }}
        >
          DAILY
        </Text>
      </Text>
    );
  };

  render() {
    const contacts = !this.state.input
      ? this.props.contacts.sort((a, b) => {
          if (a.contact.firstName < b.contact.firstName) return -1;
          if (a.contact.firstName > b.contact.firstName) return 1;
        })
      : this.state.filteredContacts.sort((a, b) => {
          if (a.contact.firstName < b.contact.firstName) return -1;
          if (a.contact.firstName > b.contact.firstName) return 1;
        });

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.headerText}>PICK CONTACTS</Text>
                <Text
                  style={{ ...styles.headerText, color: Colors.primaryColor }}
                >
                  {this.props.dailyContacts.length} CONTACTS SELECTED
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
                  input: text,
                });
              }}
            />
          </View>
        </View>
        {/* CONTACTS + DONE BUTTON */}
        <View style={{ flex: 0.8 }}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            showsVerticalScrollIndicator={false}
            data={contacts}
            keyExtractor={(item) => item.contact.id}
            renderItem={(itemData) => (
              <Contact
                frequency="daily"
                contact={itemData.item}
                addContact={() => {
                  this.props.add(itemData.item, "daily");
                }}
                removeContact={() => {
                  this.props.remove(itemData.item, "daily");
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
              this.props.navigation.navigate("PickWeekly");
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
    fontFamily: "Futura",
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontFamily: "Futura",
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  dailyContacts: state.contacts.dailyContacts,
});

const mapDispatchToProps = {
  add: addContact,
  remove: removeContact,
  sync: syncContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickContactsScreen);
