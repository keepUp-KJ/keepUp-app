export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const SYNC_CONTACTS = "SYNC_CONTACTS";
export const SET_CONTACTS = "SET_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";

import * as Contacts from "expo-contacts";
import { AsyncStorage } from "react-native";

export const syncContacts = () => async (dispatch) => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.ID,
        Contacts.Fields.Birthday,
        Contacts.Fields.PhoneNumbers,
      ],
    });
    dispatch({
      type: SYNC_CONTACTS,
      payload: data,
    });
  }
};

export const acceptContact = (userId, contact) => async (dispatch) => {
  const contacts = await AsyncStorage.getItem("@KeepUp:AcceptedContacts");
  if (contacts !== null) {
    const obj = JSON.parse(contacts);
    obj.contacts.push({
      userId,
      contactId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.phoneNumbers[0].number,
      status: "Accepted",
      frequency: "Daily",
      relation: "Friend",
    });
  } else {
    AsyncStorage.setItem(
      "@KeepUp:AcceptedContacts",
      JSON.stringify({
        contacts: [
          {
            userId,
            contactId: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            mobile: contact.phoneNumbers[0].number,
            status: "Accepted",
            frequency: "Daily",
            relation: "Friend",
          },
        ],
      })
    );
  }

  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contactId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.phoneNumbers[0].number,
      status: "Accepted",
      frequency: "Daily",
      relation: "Friend",
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (!json.error) {
        dispatch({ type: ACCEPT_CONTACT, contact });
      }
    });
};

export const rejectContact = (userId, contact) => async (dispatch) => {
  const contacts = await AsyncStorage.getItem("@KeepUp:RejectedContacts");
  if (contacts !== null) {
    const obj = JSON.parse(contacts);
    obj.contacts.push({
      userId,
      contactId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.phoneNumbers[0].number,
      status: "Rejected",
    });
  } else {
    AsyncStorage.setItem(
      "@KeepUp:RejectedContacts",
      JSON.stringify({
        contacts: [
          {
            userId,
            contactId: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            mobile: contact.phoneNumbers[0].number,
            status: "Rejected",
          },
        ],
      })
    );
  }

  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contactId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.phoneNumbers[0].number,
      status: "Rejected",
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (!json.error) {
        dispatch({ type: REJECT_CONTACT, contact });
      }
    });
};

export const getContactDecisions = (id) => async (dispatch) => {
  fetch(`http://localhost:3000/users/${id}/contacts`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: SET_CONTACTS,
        payload: json.contacts,
      });
    });
};

export const addContact = (contact, frequency) => async (dispatch) => {
  dispatch({
    type: ADD_CONTACT,
    payload: contact,
    frequency,
  });
};

export const removeContact = (contact, frequency) => async (dispatch) => {
  dispatch({
    type: REMOVE_CONTACT,
    payload: contact,
    frequency,
  });
};
