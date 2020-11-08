export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const UNREJECT_CONTACT = "UNREJECT_CONTACT";
export const SKIP_PICK = "SKIP_PICK";
export const MOVE_TO_PENDING = "MOVE_TO_PENDING";
export const SET_CONTACTS = "SET_CONTACTS";
import * as Contacts from "expo-contacts";

export const acceptContact = (userId, contact) => async () => {
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
  });
};

export const rejectContact = (userId, contact) => async () => {
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
  });
};

export const unrejectContact = (contact) => async (dispatch) => {
  await Contacts.updateContactAsync({
    id: contact.id,
    [Contacts.Fields.PhoneticFirstName]: "pending",
  });
  dispatch({
    type: UNREJECT_CONTACT,
    contact,
  });
};

export const moveToPending = (contact) => async (dispatch) => {
  await Contacts.updateContactAsync({
    id: contact.id,
    [Contacts.Fields.PhoneticFirstName]: "pending",
  });
  dispatch({
    type: MOVE_TO_PENDING,
    contact,
  });
};

export const skipPicking = () => async (dispatch) => {
  dispatch({
    type: SKIP_PICK,
  });
};

export const getContacts = (userId) => async (dispatch) => {
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
