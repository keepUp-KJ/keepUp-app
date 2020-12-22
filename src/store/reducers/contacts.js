import {
  ACCEPT_CONTACT,
  REJECT_CONTACT,
  SYNC_CONTACTS,
  SET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
} from "../actions/contacts.js";

const initialState = {
  contacts: [],
  dailyContacts: [],
  weeklyContacts: [],
  monthlyContacts: [],
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
      const updatedContacts = [];
      action.payload.forEach((contact) => {
        const newContact = { contact, accepted: false, frequency: null };
        updatedContacts.push(newContact);
      });
      return {
        contacts: updatedContacts,
        dailyContacts: [],
        weeklyContacts: [],
        monthlyContacts: [],
      };
    case SET_CONTACTS:
      return {
        ...state,
        acceptedContacts: action.payload.filter(
          (contact) => contact.status === "Accepted"
        ),
        rejectedContacts: action.payload.filter(
          (contact) => contact.status === "Rejected"
        ),
        pendingContacts: state.contacts.filter(
          (contact) =>
            !action.payload.find(
              (item) => item.contactId === contact.contact.id
            )
        ),
      };
    case ADD_CONTACT:
      const index = state.contacts.findIndex(
        (contact) => contact === action.payload
      );
      state.contacts[index].accepted = true;
      state.contacts[index].frequency = action.frequency;

      if (action.frequency === "daily")
        return {
          ...state,
          dailyContacts: [...state.dailyContacts, action.payload],
        };
      else if (action.frequency === "weekly")
        return {
          ...state,
          weeklyContacts: [...state.weeklyContacts, action.payload],
        };
      else if (action.frequency === "monthly")
        return {
          ...state,
          monthlyContacts: [...state.monthlyContacts, action.payload],
        };
    case REMOVE_CONTACT:
      const i = state.contacts.findIndex(
        (contact) => contact === action.payload
      );
      state.contacts[i].accepted = false;

      if (action.frequency === "daily") {
        const updatedContacts = state.dailyContacts.filter(
          (contact) => contact !== action.payload
        );
        return {
          ...state,
          dailyContacts: updatedContacts,
        };
      } else if (action.frequency === "weekly") {
        const updatedContacts = state.weeklyContacts.filter(
          (contact) => contact !== action.payload
        );
        return {
          ...state,
          weeklyContacts: updatedContacts,
        };
      } else if (action.frequency === "monthly") {
        const updatedContacts = state.monthlyContacts.filter(
          (contact) => contact !== action.payload
        );
        return {
          ...state,
          monthlyContacts: updatedContacts,
        };
      }
    default:
      return state;
  }
};

export default contactsReducer;
