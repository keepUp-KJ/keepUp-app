export default LOGIN = "LOGIN";
export default SIGNUP = "SIGNUP";
export default LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export default LOGIN_WITH_FACEBOOK = "LOGIN_WITH_FACEBOOK";

import * as Google from "expo-google-app-auth";

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN,
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
    }).then(() => {
      this.props.navigation.navigate("PickContacts");
    });
  }
  dispatch({
    type: LOGIN_WITH_GOOGLE,
  });
};

export const loginWithFacebook = () => async (dispatch) => {
  dispatch({
    type: LOGIN_WITH_FACEBOOK,
  });
};

export const signup = (email, password, password_confirmation) => async (
  dispatch
) => {
  dispatch({
    type: SIGNUP,
  });
};
