import {
  SET_REMINDERS,
  CREATE_REMINDER,
  LOADING,
  DONE,
} from "../actions/reminders";

const initialState = {
  reminders: [],
  loading: null,
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
