import { SET_REMINDERS } from "../actions/reminders";

const initialState = {
  reminders: [],
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REMINDERS: {
      return {
        reminders: action.reminders,
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
