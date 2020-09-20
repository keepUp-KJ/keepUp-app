import {
  ACCEPT_CONTACT,
  REJECT_CONTACT,
  UNREJECT_CONTACT,
} from "../actions/users.js";

const initialState = {
  user: {},
  acceptedContacts: [],
  rejectedContacts: [],
};

const usersReducers = (state = initialState, action) => {
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
        rejectedContacts: state.rejectedContacts,
        acceptedContacts: state.acceptedContacts,
      };
    default:
      return state;
  }
};

export default usersReducers;
