import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../components/Contact";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Header from "../components/Header";

class PickContactsScreen extends React.Component {
  state = {
    contacts: [],
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
              <Text style={{ ...styles.text, fontWeight: "700" }}>
                PICK CONTACTS
              </Text>
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
            <Input placeholder="Search..." />
          </View>
        </View>

        <View style={{ flex: 0.9 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.contacts.sort((a, b) => {
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
            })}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => <Contact name={itemData.item.name} />}
            numColumns={3}
          />
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
  },
});

export default PickContactsScreen;
