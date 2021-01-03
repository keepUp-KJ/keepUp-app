import {
  SET_REMINDERS,
  DONE,
  SET_COMPLETED,
  ADD_CONTACT,
} from "../actions/reminders";

const initialState = {
  reminders: [],
  loading: true,
  contacts: [],
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders,
      };
    }
    case DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_COMPLETED: {
      return {
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== action.id
        ),
      };
    }
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, action.contact],
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
