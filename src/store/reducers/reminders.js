import { SET_REMINDERS, DONE } from "../actions/reminders";

const initialState = {
  reminders: [],
  loading: true,
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
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
