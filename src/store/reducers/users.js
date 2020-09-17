import { ACCEPT_CONTACT, REJECT_CONTACT } from "../actions/users.js";

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
    default:
      return state;
  }
};

export default usersReducers;
