import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../components/Contact";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Header from "../components/Header";
import Btn from "../components/Btn";

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
        fields: [Contacts.Fields.ID, Contacts.Fields.Birthday],
      });
      this.setState({ contacts: data });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Header
            centerComponent={
              <View>
                <Text style={styles.text}>PICK CONTACTS</Text>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: 12,
                    color: Colors.primaryColor,
                  }}
                >
                  2 CONTACTS SELECTED
                </Text>
              </View>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
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
                    const name =
                      contact.firstName || "" + " " + contact.lastName || "";
                    return name.indexOf(text) > -1;
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

        <View style={{ flex: 0.9 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              !this.state.input
                ? this.state.contacts.sort((a, b) => {
                    if (a.firstName < b.firstName) return -1;
                    if (a.firstName > b.firstName) return 1;
                  })
                : this.state.filteredContacts.sort((a, b) => {
                    if (a.firstName < b.firstName) return -1;
                    if (a.firstName > b.firstName) return 1;
                  })
            }
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => <Contact name={itemData.item.name} />}
            numColumns={3}
            ListHeaderComponent={this.renderHeader}
          />
          <View style={{ alignItems: "center" }}>
            <Btn
              title="Done"
              btnColor={Colors.primaryColor}
              style={{ position: "absolute", width: "50%", marginTop: -80 }}
            />
          </View>
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

export default PickContactsScreen;
