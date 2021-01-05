export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";
export const DONE = "DONE";
export const ERROR = "ERROR";
export const SET_COMPLETED = "SET_COMPLETED";
export const ADD_CONTACT_TO_REMINDER = "ADD_CONTACT_TO_REMINDER";
export const LOADING = "LOADING";

import { AsyncStorage } from "react-native";
import { navigate } from "../../navigation/navigationRef";
import moment from "moment";

export const getReminders = (userId) => async (dispatch) => {
  // await AsyncStorage.getItem(
  //   `@KeepUp:${userId}/ContactReminders`,
  //   (err, result) => {
  //     if (result) {
  //       dispatch({
  //         type: SET_REMINDERS,
  //         reminders: JSON.parse(result),
  //       });
  //     } else {
  dispatch({ type: LOADING });
  fetch(`https://rocky-mesa-61495.herokuapp.com/reminders/${userId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: SET_REMINDERS,
        reminders: json.reminders,
      });
      AsyncStorage.setItem(
        `@KeepUp:${userId}/ContactReminders`,
        JSON.stringify(json.reminders)
      );
    });
};

export const addReminder = (userId, date, contacts, occasion, notify) => async (
  dispatch
) => {
  fetch("https://rocky-mesa-61495.herokuapp.com/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      date,
      contacts,
      occasion,
      notify,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        dispatch({ type: ERROR, error: json.error });
      } else {
        dispatch({
          type: CREATE_REMINDER,
          reminder: json.reminder,
        });
        navigate("Home");
      }
    });
};

export const setupAccount = (contacts, userId) => async (dispatch) => {
  fetch("https://rocky-mesa-61495.herokuapp.com/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contacts,
      userId,
    }),
  });
  // .then((res) => res.json())
  // .then((json) => {
  //   if (!json.error) {
  //     const contactReminders = [];
  //     contacts.map((contact) => {
  //       const reminder = {
  //         date:
  //           contact.frequency === "weekly"
  //             ? moment().add(7, "days").format("MMM DD, YYYY")
  //             : contact.frequency === "monthly"
  //             ? moment().add(30, "days").format("MMM DD, YYYY")
  //             : moment().format("MMM DD, YYYY"),
  //         contacts: [
  //           {
  //             id: contact.contact.id,
  //             firstName: contact.contact.firstName,
  //             lastName: contact.contact.lastName,
  //           },
  //         ],
  //         occasion: null,
  //         notify: "On the same day",
  //         completed: false,
  //       };
  //       contactReminders.push(reminder);
  //     });
  //     AsyncStorage.setItem(
  //       `@KeepUp:${userId}/ContactReminders`,
  //       JSON.stringify(contactReminders)
  //     );
  dispatch({
    type: DONE,
  });
  navigate("Home");
};

export const addContactsToReminder = (contact) => async (dispatch) => {
  dispatch({
    type: ADD_CONTACT_TO_REMINDER,
    contact,
  });
};

export const setCompleted = (reminderId, contact) => async (dispatch) => {
  dispatch({
    type: SET_COMPLETED,
    id: reminderId,
    contact,
  });
};
