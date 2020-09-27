import { LOGIN, LOGIN_WITH_GOOGLE, LOGIN_ERROR } from "../actions/users";

const initialState = {
  user: {},
  token: "",
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_GOOGLE:
      return {
        user: action.user,
      };
    case LOGIN:
      return {
        token: action.token,
      };
    case LOGIN_ERROR:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default usersReducer;
