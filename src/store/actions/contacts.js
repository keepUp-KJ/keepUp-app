export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const UNREJECT_CONTACT = "UNREJECT_CONTACT";
export const SKIP_PICK = "SKIP_PICK";
export const MOVE_TO_PENDING = "MOVE_TO_PENDING";
import * as Contacts from "expo-contacts";

export const acceptContact = (contact) => async (dispatch) => {
  await Contacts.updateContactAsync({
    id: contact.id,
    [Contacts.Fields.PhoneticFirstName]: "accepted",
  });
  dispatch({
    type: ACCEPT_CONTACT,
    contact,
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
