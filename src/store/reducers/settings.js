import { GET_SETTINGS, UPDATE_SETTINGS } from "../actions/settings";

const initialState = {
  settings: [],
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return {
        settings: action.settings,
      };
    }
    case UPDATE_SETTINGS:
      return {
        settings: action.settings,
      };
    default:
      return state;
  }
};

export default settingsReducer;
