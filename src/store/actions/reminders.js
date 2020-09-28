export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";

import { navigate } from "../../navigation/navigationRef";

export const getReminders = () => async (dispatch) => {
  fetch("https://keep-up-mock.herokuapp.com/api/reminders", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: SET_REMINDERS,
        reminders: json.reminders,
      });
    });
};

export const addReminder = (date, contact, occasion, notify) => async (
  dispatch
) => {
  fetch("https://keep-up-mock.herokuapp.com/api/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      contact,
      occasion,
      notify,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.response === "Success") {
        dispatch({
          type: CREATE_REMINDER,
          date,
          contact,
          occasion,
          notify,
        });
        navigate("Home");
      }
    });
};
