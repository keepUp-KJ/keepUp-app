import {
  SET_REMINDERS,
  DONE,
  SET_COMPLETED,
  ADD_CONTACT_TO_REMINDER,
  ERROR,
  CREATE_REMINDER,
  LOADING,
} from "../actions/reminders";

const initialState = {
  reminders: [],
  loading: null,
  contacts: [],
  error: "",
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders,
        loading: false,
      };
    }
    case DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_COMPLETED: {
      const reminderIndex = state.reminders.findIndex(
        (reminder) => reminder._id === action.id
      );

      const updatedContacts = state.reminders[reminderIndex].contacts.filter(
        (contact) => contact !== action.contact
      );

      state.reminders[reminderIndex].contacts = updatedContacts;

      return {
        reminders: state.reminders,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ADD_CONTACT_TO_REMINDER: {
      if (!state.contacts.find((contact) => contact === action.contact)) {
        return {
          ...state,
          contacts: [...state.contacts, action.contact],
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case CREATE_REMINDER: {
      return {
        contacts: [],
        reminders: [...state.reminders, action.reminder],
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
