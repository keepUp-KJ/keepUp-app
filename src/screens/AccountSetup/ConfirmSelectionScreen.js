import React from "react";
import { SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../../components/TextComp";

class ConfirmSelectionScreen extends React.Component {
  renderContact = (itemData) => (
    <TouchableOpacity
      style={{
        ...styles.card,
        backgroundColor:
          itemData.item.frequency === "daily"
            ? Colors.primaryColor
            : itemData.item.frequency === "weekly"
            ? Colors.blue
            : itemData.item.frequency === "monthly"
            ? Colors.babyBlue
            : Colors.tomato,
      }}
    >
      <TextComp style={styles.contactText}>{itemData.item.info.name}</TextComp>
    </TouchableOpacity>
  );

  render() {
    const contacts = this.props.contacts
      .filter(
        (contact) => contact.isAccepted === true || contact.isRejected === true
      )
      .sort((a, b) => {
        if (a.isRejected < b.isRejected) return -1;
      });

    return (
      <SafeAreaView style={styles.screen}>
        <View style={{ flex: 0.15, justifyContent: "center" }}>
          <Header
            leftComponent={
              <Ionicons
                name="md-arrow-back"
                size={25}
                color={Colors.secondary}
                onPress={() => {
                  this.props.navigation.navigate("PickMonthly");
                }}
              />
            }
            centerComponent={
              <TextComp bold style={styles.title}>
                Confirm Selection
              </TextComp>
            }
          />
        </View>
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={contacts}
            keyExtractor={(item) => item.info.id}
            renderItem={this.renderContact}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate("Setup");
            }}
          >
            <TextComp bold style={styles.btnText}>
              Confirm
            </TextComp>
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
  title: {
    fontSize: 18,
    color: Colors.secondary,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  list: {
    flex: 0.75,
    alignItems: "center",
  },
  container: {
    flex: 0.1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    padding: 15,
    marginVertical: 10,
  },
  initials: {
    fontSize: 18,
    color: Colors.secondary,
  },
  btn: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    flex: 0.1,
    width: "65%",
    alignSelf: "center",
    justifyContent: "center",
  },
  card: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
  },
  contactText: {
    textAlign: "center",
    fontFamily: "Futura",
    fontSize: 14,
    paddingHorizontal: 5,
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  dailyContacts: state.contacts.dailyContacts,
  weeklyContacts: state.contacts.weeklyContacts,
  monthlyContacts: state.contacts.monthlyContacts,
});

export default connect(mapStateToProps)(ConfirmSelectionScreen);
