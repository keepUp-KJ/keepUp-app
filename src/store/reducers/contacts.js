import {
  SYNC_CONTACTS,
  SET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  EDIT_CONTACT,
  ACCEPT_CONTACT,
} from "../actions/contacts.js";

const initialState = {
  contacts: [],
  dailyContacts: [],
  weeklyContacts: [],
  monthlyContacts: [],
  acceptedContacts: [],
  pendingContacts: [],
  loading: null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_CONTACTS:
      const updatedContacts = [];
      action.payload.forEach((contact) => {
        const newContact = {
          info: contact,
          isAccepted: false,
          isRejected: false,
          frequency: null,
          notify: null,
        };
        updatedContacts.push(newContact);
      });
      return {
        contacts: updatedContacts,
        dailyContacts: [],
        weeklyContacts: [],
        monthlyContacts: [],
        loading: true,
      };
    case SET_CONTACTS:
      return {
        ...state,
        acceptedContacts: action.payload.filter(
          (contact) => contact.isAccepted
        ),
        pendingContacts: state.contacts.filter(
          (contact) =>
            !action.payload.find((item) => item.info.id === contact.info.id)
        ),
        loading: false,
      };
    case ADD_CONTACT:
      const index = state.contacts.findIndex(
        (contact) => contact === action.payload
      );
      state.contacts[index].isAccepted = true;
      state.contacts[index].frequency = action.frequency;
      state.contacts[index].notify = "On the same day";

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
    case ACCEPT_CONTACT:
      const x = state.contacts.findIndex(
        (contact) => contact === action.contact
      );

      state.contacts[x].isAccepted = true;
      state.contacts[x].frequency = action.frequency;

      return {
        ...state,
        pendingContacts: state.pendingContacts.filter(
          (contact) => !contact.isAccepted
        ),
      };
    case REMOVE_CONTACT:
      const i = state.contacts.findIndex(
        (contact) => contact === action.payload
      );
      state.contacts[i].isAccepted = false;

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
    case EDIT_CONTACT:
      const contactIndex = state.acceptedContacts.findIndex(
        (contact) => contact._id === action.contactId
      );
      console.log(contactIndex);
      if (contactIndex !== -1) {
        state.acceptedContacts[contactIndex].frequency = action.frequency;
        state.acceptedContacts[contactIndex].notify = action.notify;
        return {
          acceptedContacts: state.acceptedContacts,
        };
      }
    default:
      return state;
  }
};

export default contactsReducer;
