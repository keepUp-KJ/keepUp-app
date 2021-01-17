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
  LOADING,
} from "../actions/users";

const initialState = {
  user: {},
  errors: {},
  loginError: null,
  confirm: false,
  loading: null,
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
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error,
        loading: false,
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
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default usersReducer;
