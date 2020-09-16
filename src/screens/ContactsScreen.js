import React from "react";
import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Contact from "../components/Contact";
import Menu from "../components/Menu";
import RejectedContact from "../components/RejectedContact";

class ContactsScreen extends React.Component {
  state = {
    input: "",
    active: "Accepted",
  };

  renderContact = (itemData) => <Contact contact={itemData.item} />;

  renderRejectedContact = (itemData) => (
    <RejectedContact contact={itemData.item} />
  );

  render() {
    const acceptedContacts = this.props.navigation.getParam("accepted");
    const rejectedContacts = this.props.navigation.getParam("rejected");

    const accepted = this.state.active === "Accepted";
    const rejected = this.state.active === "Rejected";

    return (
      <SafeAreaView style={styles.screen}>
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
                value={this.state.input}
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
                    input: text,
                  });
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flex: rejected ? 0.8 : 0.7,
            marginHorizontal: rejected ? 0 : 20,
          }}
        >
          <FlatList
            key={accepted ? "1" : "0"}
            data={
              accepted ? acceptedContacts : rejected ? rejectedContacts : null
            }
            renderItem={
              accepted ? this.renderContact : this.renderRejectedContact
            }
            numColumns={accepted ? 3 : null}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Menu
          active={this.state.active}
          onChange={(active) => {
            this.setState({ active });
          }}
        />
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
});

export default ContactsScreen;
