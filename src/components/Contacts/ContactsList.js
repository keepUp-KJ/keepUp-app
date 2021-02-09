import React from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import {
  editContact,
  syncContacts,
  acceptContact,
  rejectContact,
  removeFromBlackList,
} from "../../store/actions/contacts";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import ContactCard from "./ContactCard";
import TextComp from "../TextComp";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const SCREEN_WIDTH = Dimensions.get("window").width;
class ContactsList extends React.Component {
  state = {
    activeContact: null,
    visible: false,
    active: 0,
    changed: false,
  };

  STATUS = ["Accepted", "Pending", "Rejected"];
  contactsList = [this.props.accepted, this.props.pending, this.props.rejected];

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

  search = (currentList, text) => {
    const updatedContacts = currentList.filter((contact) => {
      const name = String.prototype.toUpperCase.call(
        (contact.info.firstName || "") + " " + (contact.info.lastName || "")
      );

      const search = String.prototype.toUpperCase.call(text);
      return name.indexOf(search) > -1;
    });

    this.setState({
      filteredContacts: updatedContacts,
    });
  };

  render() {
    setTimeout(() => {
      if (this.props.searchInput && !this.state.changed)
        this.setState({
          filteredContacts: this.props.filteredContacts,
        });
    });

    return (
      <>
        {this.state.activeContact !== null && (
          <ContactCard
            activeTab={this.STATUS[this.state.active]}
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

        <View style={styles.menu}>
          {this.STATUS.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.menuItem,
                borderBottomWidth: this.state.active === index ? 3 : 0,
              }}
            >
              <TextComp
                style={styles.text}
                bold={this.state.active === index}
                onPress={() => {
                  this.list.scrollToIndex({ index });
                  this.props.onChange(index);
                  this.setState({ active: index, changed: true });
                  if (this.props.searchInput) {
                    const currentList =
                      item === "Pending"
                        ? this.props.pending
                        : item === "Accepted"
                        ? this.props.accepted
                        : this.props.rejected;
                    this.search(currentList, this.props.searchInput);
                  }
                }}
              >
                {item === "Accepted"
                  ? "FRIENDS"
                  : item === "Rejected"
                  ? "BLACKLIST"
                  : item.toUpperCase()}
              </TextComp>
            </View>
          ))}
        </View>
        <View style={styles.container}>
          <SwiperFlatList
            ref={(ref) => {
              this.list = ref;
            }}
            index={this.state.active}
            data={this.contactsList}
            onChangeIndex={(item) => {
              this.props.searchInput &&
                this.search(
                  this.contactsList[item.index],
                  this.props.searchInput
                );
              this.setState({ active: item.index });
            }}
            renderItem={(itemData) => (
              <FlatList
                style={{ width: SCREEN_WIDTH - 40 }}
                showsVerticalScrollIndicator={false}
                data={
                  this.props.searchInput
                    ? this.state.filteredContacts
                    : itemData.item
                }
                renderItem={this.renderContact}
                numColumns={3}
                keyExtractor={(item) => item.info.id}
              />
            )}
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
    paddingHorizontal: 20,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  menuItem: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: Colors.secondary,
    borderBottomColor: Colors.primaryColor,
  },
  text: {
    color: Colors.secondary,
    fontSize: 13,
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
