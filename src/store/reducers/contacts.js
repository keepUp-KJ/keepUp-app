import {
  ACCEPT_CONTACT,
  REJECT_CONTACT,
  SYNC_CONTACTS,
  SET_CONTACTS,
} from "../actions/contacts.js";

const initialState = {
  contacts: [], //Contacts synced from the device
  acceptedContacts: [], //Accepted Contacts in PickContacts screen
  rejectedContacts: [], //Rejected Contacts in PickContacts screen
  pendingContacts: [],
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
        contacts: action.payload,
      };

    case SET_CONTACTS:
      return {
        acceptedContacts: action.payload.filter(
          (contact) => contact.status === "Accepted"
        ),
        rejectedContacts: action.payload.filter(
          (contact) => contact.status === "Rejected"
        ),
        pendingContacts: state.contacts.filter(
          (contact) =>
            !action.payload.find((item) => item.contactId === contact.id)
        ),
      };

    default:
      return state;
  }
};

export default contactsReducer;
