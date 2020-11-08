export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";

export const ERROR = "ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";
export const HIDE_LOGIN_ERROR = "HIDE_LOGIN_ERROR";

import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { navigate } from "../../navigation/navigationRef";

export const login = (email, password) => async (dispatch) => {
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        dispatch({
          type: LOGIN_ERROR,
          error: json.error,
        });
      } else {
        navigate("PickContacts");
      }
    });
};

export const loginWithGoogle = () => async (dispatch) => {
  const { type, accessToken, user } = await Google.logInAsync({
    iosClientId:
      "185536610149-bcqhr252u7nldti82j9s14c7d1q58oca.apps.googleusercontent.com",
    androidClientId:
      "185536610149-od4i0eei4e5f6ctibmla3sj5nme031ml.apps.googleusercontent.com",
    language: "en-US",
  });

  if (type === "success") {
    // Then you can use the Google REST API
    await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  dispatch({
    type: LOGIN_WITH_GOOGLE,
    user,
  });
};

export const loginWithFacebook = () => async (dispatch) => {
  try {
    await Facebook.initializeAsync("2720884158015038");
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      await fetch(`https://graph.facebook.com/me?access_token=${token}`).then(
        () => {
          dispatch({
            type: LOGIN,
            token,
          });
        }
      );
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export const signup = (email, password, confPassword) => async (dispatch) => {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      confPassword,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.user) {
        dispatch({
          type: SIGNUP,
          payload: json.user,
        });
        navigate("VerifyEmail");
      }

      dispatch({
        type: ERROR,
        payload: json.errors,
      });
    });
};

export const hideError = (error) => async (dispatch) => {
  dispatch({
    type: HIDE_ERROR,
    payload: error,
  });
};

export const hideLoginError = () => async (dispatch) => {
  dispatch({
    type: HIDE_LOGIN_ERROR,
  });
};

export const verifyEmail = (email, code) => async (dispatch) => {
  fetch("http://localhost:3000/users/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error)
        dispatch({
          type: LOGIN_ERROR,
          error: json.error,
        });
      else {
        navigate("PickContacts");
      }
    });
};
