import {
  LOGIN,
  LOGIN_WITH_GOOGLE,
  ERROR,
  SIGNUP,
  LOGIN_ERROR,
  HIDE_ERROR,
  HIDE_LOGIN_ERROR,
} from "../actions/users";

const initialState = {
  user: {},
  token: "",
  errors: {},
  loginError: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    case ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error,
      };
    case HIDE_ERROR:
      return {
        ...state,
        errors: {
          email:
            action.payload === "email" ? "" : "all" ? "" : state.errors.email,
          password:
            action.payload === "password"
              ? ""
              : "all"
              ? ""
              : state.errors.password,
          confPassword:
            action.payload === "confPassword"
              ? ""
              : "all"
              ? ""
              : state.errors.confPassword,
        },
      };
    case HIDE_LOGIN_ERROR:
      return {
        ...state,
        loginError: "",
      };
    default:
      return state;
  }
};

export default usersReducer;
