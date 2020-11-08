export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const UNREJECT_CONTACT = "UNREJECT_CONTACT";
export const SKIP_PICK = "SKIP_PICK";
export const MOVE_TO_PENDING = "MOVE_TO_PENDING";
import * as Contacts from "expo-contacts";

export const acceptContact = (userId, contact) => async (dispatch) => {
  var bDate =
    contact.birthday.day +
    "/" +
    contact.birthday.month +
    "/" +
    contact.birthday.year;
  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: "100",
      birthday: bDate,
      status: "Accepted",
      frequency: "Daily",
      relation: "Friend",
    }),
  });
};

export const rejectContact = (contact) => async (dispatch) => {
  await Contacts.updateContactAsync({
    id: contact.id,
    [Contacts.Fields.PhoneticFirstName]: "rejected",
  });
  dispatch({
    type: REJECT_CONTACT,
    contact,
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
