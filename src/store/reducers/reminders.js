import { SET_REMINDERS, CREATE_REMINDER } from "../actions/reminders";

const initialState = {
  reminders: [],
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REMINDERS: {
      return {
        reminders: [action.reminder, ...state.reminders],
      };
    }
    case CREATE_REMINDER: {
      var newReminder = {
        date: action.date,
        contact: action.contact,
        occasion: action.occasion,
        notify: action.notify,
      };
      return {
        reminders: [newReminder, ...state.reminders],
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
