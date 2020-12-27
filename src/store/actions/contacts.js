export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const SYNC_CONTACTS = "SYNC_CONTACTS";
export const SET_CONTACTS = "SET_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";

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

export const getContactDecisions = (id) => async (dispatch) => {
  fetch(`https://rocky-mesa-61495.herokuapp.com/users/${id}/contacts`, {
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

export const acceptContact = (userId, contact, frequency) => async (
  dispatch
) => {
  fetch(`https://rocky-mesa-61495.herokuapp.com/contacts/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contact,
      frequency,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.response) {
        dispatch({
          type: ACCEPT_CONTACT,
          payload: contact,
          frequency,
        });
      }
    });
};
