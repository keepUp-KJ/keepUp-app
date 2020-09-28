import { GET_SETTINGS } from "../actions/settings";

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
    default:
      return state;
  }
};

export default settingsReducer;
