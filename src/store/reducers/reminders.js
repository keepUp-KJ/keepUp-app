import {
  SET_REMINDERS,
  DONE,
  SET_COMPLETED,
  ADD_CONTACT_TO_REMINDER,
  ERROR,
  CREATE_REMINDER,
  LOADING,
  CANCEL,
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
      const updatedReminders = state.reminders.filter(
        (reminder) => reminder._id !== action.id
      );

      // state.reminders[reminderIndex].completed = true;

      return {
        reminders: updatedReminders,
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
    case CANCEL: {
      return {
        ...state,
        contacts: [],
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
