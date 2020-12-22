import React from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Colors from "../constants/Colors";

class ConfirmSelectionScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Daily</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.dailyContacts}
            keyExtractor={(item) => item.contact.id}
            renderItem={(itemData) => (
              <View style={styles.nameContainer}>
                <Text>{itemData.item.contact.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>Weekly</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.weeklyContacts}
            keyExtractor={(item) => item.contact.id}
            renderItem={(itemData) => (
              <View style={styles.nameContainer}>
                <Text>{itemData.item.contact.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>Monthly</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.monthlyContacts}
            keyExtractor={(item) => item.contact.id}
            renderItem={(itemData) => (
              <View style={styles.nameContainer}>
                <Text>{itemData.item.contact.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={{ flex: 0.1, width: "65%", alignSelf: "center" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate("Setup");
            }}
          >
            <Text style={styles.btnText}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    fontFamily: "Futura",
    fontSize: 25,
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Futura",
    color: "white",
    textAlign: "left",
    marginHorizontal: 15,
    fontWeight: "700",
  },
  list: {
    flex: 0.25,
  },
  container: {
    justifyContent: "center",
    backgroundColor: "grey",
    flex: 0.05,
  },
  nameContainer: {
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btn: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Futura",
    fontWeight: "700",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.acceptedContacts,
  dailyContacts: state.contacts.dailyContacts,
  weeklyContacts: state.contacts.weeklyContacts,
  monthlyContacts: state.contacts.monthlyContacts,
});

export default connect(mapStateToProps)(ConfirmSelectionScreen);
