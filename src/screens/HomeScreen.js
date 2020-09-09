import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-gesture-handler";
import Contact from "../components/Contact";
import Colors from "../constants/Colors";
import Input from "../components/Input";

class HomeScreen extends React.Component {
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
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontFamily: "Futura",
              fontWeight: "bold",
              color: Colors.secondary,
            }}
          >
            PICK CONTACTS
          </Text>
        </View>
        <View style={{ width: "85%" }}>
          <Input placeholder="Search..." />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.contacts}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => <Contact name={itemData.item.name} />}
          numColumns={3}
        />
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
});

export default HomeScreen;
