import {
  LOGIN_WITH_GOOGLE,
  ERROR,
  SIGNUP,
  LOGIN_ERROR,
  HIDE_ERROR,
  HIDE_LOGIN_ERROR,
  SIGNOUT,
  FORGOT_PASSWORD,
  RESET,
} from "../actions/users";

const initialState = {
  user: {},
  errors: {},
  loginError: "",
  confirm: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        user: action.user,
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
            action.payload === "email" || action.payload === "all"
              ? ""
              : state.errors.email,
          password:
            action.payload === "password" || action.payload === "all"
              ? ""
              : state.errors.password,
          confPassword:
            action.payload === "confPassword" || action.payload === "all"
              ? ""
              : state.errors.confPassword,
        },
      };
    case HIDE_LOGIN_ERROR:
      return {
        ...state,
        loginError: "",
      };
    case SIGNOUT:
      return {
        user: {},
        errors: {},
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        confirm: true,
      };
    case RESET:
      return {
        ...state,
        confirm: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
