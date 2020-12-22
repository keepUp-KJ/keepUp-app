import { SET_REMINDERS, CREATE_REMINDER } from "../actions/reminders";

const initialState = {
  reminders: [],
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders.filter((rem) => rem.frequency === "daily"),
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
