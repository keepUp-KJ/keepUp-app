export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";

import { AsyncStorage } from "react-native";
import { navigate } from "../../navigation/navigationRef";
import moment from "moment";

export const getReminders = () => async (dispatch) => {
  await AsyncStorage.getItem(`@KeepUp:ContactReminders`, (err, result) => {
    dispatch({
      type: SET_REMINDERS,
      reminders: JSON.parse(result),
    });
  });
  // fetch("https://keep-up-mock.herokuapp.com/api/reminders", {
  //   method: "GET",
  // })
  //   .then((res) => res.json())
  //   .then((json) => {
  //     dispatch({
  //       type: SET_REMINDERS,
  //       reminders: json.reminders,
  //     });
  //   });
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

export const generateReminders = (contacts) => async (dispatch) => {
  const contactReminders = [];
  contacts.map((contact) => {
    const reminder = {
      start: moment().format("DD-MMM-YYYY"),
      contactId: contact.contact.id,
      text: `Call ${
        contact.contact.firstName + " " + contact.contact.lastName
      }`,
      frequency: contact.frequency,
      completed: false,
    };
    contactReminders.push(reminder);
  });
  AsyncStorage.setItem(
    `@KeepUp:ContactReminders`,
    JSON.stringify(contactReminders)
  );
};

export const addContactsToReminder = () => async (dispatch) => {};
