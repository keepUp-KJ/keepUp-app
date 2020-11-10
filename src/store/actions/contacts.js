export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const SYNC_CONTACTS = "SYNC_CONTACTS";
export const SET_CONTACTS = "SET_CONTACTS";

import * as Contacts from "expo-contacts";

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

export const getContactDecisions = (userId) => async (dispatch) => {
  fetch("http://localhost:3000/contacts", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: SET_CONTACTS,
        payload: json.contacts.filter((contact) => contact.userId === userId),
      });
    });
};
