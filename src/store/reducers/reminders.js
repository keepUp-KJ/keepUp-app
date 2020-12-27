import { SET_REMINDERS, DONE, SET_COMPLETED } from "../actions/reminders";

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
      const index = state.reminders.findIndex(
        (reminder) => reminder._id === action.id
      );

      if (index !== -1) {
        state.reminders[index].completed = true;
        return {
          reminders: state.reminders,
        };
      }
    }
    default:
      return state;
  }
};

export default remindersReducer;
