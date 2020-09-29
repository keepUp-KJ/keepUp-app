import {
  ACCEPT_CONTACT,
  REJECT_CONTACT,
  SKIP_PICK,
  UNREJECT_CONTACT,
  MOVE_TO_PENDING,
} from "../actions/contacts.js";

const initialState = {
  user: {},
  acceptedContacts: [],
  rejectedContacts: [],
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
    case UNREJECT_CONTACT:
      const index = state.rejectedContacts.indexOf(action.contact);
      state.rejectedContacts.splice(index, 1);

      return {
        ...state,
        rejectedContacts: state.rejectedContacts,
      };
    case MOVE_TO_PENDING:
      const id = state.acceptedContacts.indexOf(action.contact);
      state.acceptedContacts.splice(id, 1);
      return {
        ...state,
        acceptedContacts: state.acceptedContacts,
      };
    case SKIP_PICK:
      return {
        ...state,
        acceptedContacts: [],
        rejectedContacts: [],
      };
    default:
      return state;
  }
};

export default contactsReducer;
