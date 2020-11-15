import {
  ACCEPT_CONTACT,
  REJECT_CONTACT,
  SYNC_CONTACTS,
  SET_CONTACTS,
} from "../actions/contacts.js";

const initialState = {
  user: {},
  contacts: [],
  acceptedContacts: [],
  rejectedContacts: [],
  accepted: [],
  rejected: [],
  pending: [],
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_CONTACT:
      return {
        ...state,
        acceptedContacts: [action.contact, ...state.acceptedContacts],
      };
    case REJECT_CONTACT:
      return {
        ...state,
        rejectedContacts: [action.contact, ...state.rejectedContacts],
      };
    case SYNC_CONTACTS:
      return {
        acceptedContacts: [],
        rejectedContacts: [],
        contacts: action.payload,
      };
    case SET_CONTACTS:
      return {
        ...state,
        accepted: action.payload.filter(
          (contact) => contact.status === "Accepted"
        ),
        rejected: action.payload.filter(
          (contact) => contact.status === "Rejected"
        ),
        pending: state.contacts.filter(
          (contact) =>
            !action.payload.find((item) => item.contactId === contact.id)
        ),
      };
    default:
      return state;
  }
};

export default contactsReducer;
