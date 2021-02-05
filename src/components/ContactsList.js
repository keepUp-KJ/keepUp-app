import React from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  editContact,
  syncContacts,
  acceptContact,
  rejectContact,
  removeFromBlackList,
} from "../store/actions/contacts";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import ContactCard from "./Contacts/ContactCard";
import TextComp from "./TextComp";

class ContactsList extends React.Component {
  state = {
    activeContact: null,
    visible: false,
  };

  renderContact = (itemData) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => {
        this.setState({
          visible: true,
          activeContact: itemData.item,
        });
      }}
    >
      <TextComp style={styles.text}>
        {itemData.item.info.firstName} {itemData.item.info.lastName}
      </TextComp>
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        {this.state.activeContact !== null && (
          <ContactCard
            activeTab={this.props.activeTab}
            visible={this.state.visible}
            contact={this.state.activeContact}
            close={() =>
              this.setState({
                visible: false,
                activeContact: null,
              })
            }
            onAccept={(frequency) => {
              this.props
                .accept(
                  this.props.user._id,
                  this.state.activeContact,
                  frequency,
                  this.props.user.token
                )
                .then(() => {
                  this.setState({
                    visible: false,
                    activeContact: null,
                  });
                });
            }}
            onReject={() => {
              this.props
                .reject(
                  this.props.user._id,
                  this.state.activeContact,
                  this.props.user.token
                )
                .then(() => {
                  this.setState({
                    visible: false,
                    activeContact: null,
                  });
                });
            }}
            onEdit={(frequency, notify) => {
              this.props.edit(
                this.state.activeContact._id,
                frequency,
                notify,
                this.props.user.token
              );
            }}
            onRemove={() => {
              this.props
                .remove(this.state.activeContact, this.props.user.token)
                .then(() => {
                  this.setState({ visible: false, activeContact: null });
                });
            }}
          />
        )}
        <View
          style={{
            ...styles.container,
            alignItems: this.props.loading ? "center" : "flex-start",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              this.props.searchInput
                ? this.props.filteredContacts
                : this.props.activeTab === "Accepted"
                ? this.props.accepted
                : this.props.activeTab === "Pending"
                ? this.props.pending
                : this.props.activeTab === "Rejected"
                ? this.props.rejected
                : null
            }
            renderItem={this.renderContact}
            numColumns={3}
            keyExtractor={(item) => item.info.id}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get("window").width / 3.7,
    width: Dimensions.get("window").width / 3.7,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "rgb(248, 249, 253)",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
    color: Colors.secondary,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  contacts: state.contacts.contacts,
  accepted: state.contacts.acceptedContacts,
  pending: state.contacts.pendingContacts,
  rejected: state.contacts.rejectedContacts,
});

const mapDispatchToProps = {
  accept: acceptContact,
  edit: editContact,
  reject: rejectContact,
  sync: syncContacts,
  remove: removeFromBlackList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
