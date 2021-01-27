export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";
export const DONE = "DONE";
export const ERROR = "ERROR";
export const SET_COMPLETED = "SET_COMPLETED";
export const ADD_CONTACT_TO_REMINDER = "ADD_CONTACT_TO_REMINDER";
export const LOADING = "LOADING";
export const CANCEL = "CANCEL";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../../navigation/navigationRef";
import moment from "moment";

export const getReminders = (userId, token) => async (dispatch) => {
  // const reminders = await AsyncStorage.getItem(`@KeepUp:${userId}/reminders`);
  // if (reminders) {
  //   dispatch({
  //     type: SET_REMINDERS,
  //     reminders: JSON.parse(reminders),
  //   });
  // } else {
  dispatch({ type: LOADING });
  fetch(`https://rocky-mesa-61495.herokuapp.com/reminders/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then(async (json) => {
      dispatch({
        type: SET_REMINDERS,
        reminders: json.reminders,
      });
      await AsyncStorage.setItem(
        `@KeepUp:${userId}/reminders`,
        JSON.stringify(json.reminders)
      );
    });
  // }
};

export const addReminder = (userId, date, contacts, occasion, token) => async (
  dispatch
) => {
  fetch("https://rocky-mesa-61495.herokuapp.com/reminders", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      date,
      contacts,
      occasion,
    }),
  })
    .then((res) => res.json())
    .then(async (json) => {
      if (json.error) {
        dispatch({ type: ERROR, error: json.error });
      } else {
        const reminders = JSON.parse(
          await AsyncStorage.getItem(`@KeepUp:${userId}/reminders`)
        );
        if (reminders) {
          reminders.push(json.reminder);
          await AsyncStorage.setItem(
            `@KeepUp:${userId}/reminders`,
            JSON.stringify(reminders)
          );
        }
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
  })
    .then((res) => res.json())
    .then(async (json) => {
      if (!json.error) {
        const reminders = [];
        const userContacts = [];

        contacts.map((contact) => {
          if (contact.isAccepted) {
            const reminder = {
              date:
                contact.frequency === "weekly"
                  ? moment().add(7, "days").format("MMM DD, YYYY")
                  : contact.frequency === "monthly"
                  ? moment().add(30, "days").format("MMM DD, YYYY")
                  : moment().format("MMM DD, YYYY"),
              contacts: [
                {
                  info: {
                    id: contact.info.id,
                    firstName: contact.info.firstName,
                    lastName: contact.info.lastName,
                  },
                },
              ],
              occasion: null,
              notify: "On the same day",
              completed: false,
            };
            reminders.push(reminder);
          }
          const newContact = {
            info: {
              id: contact.info.id,
              firstName: contact.info.firstName,
              lastName: contact.info.lastName,
              mobile: contact.info.phoneNumbers[0].number,
            },
            isAccepted: contact.isAccepted,
            isRejected: contact.isRejected,
            frequency: contact.frequency,
            notify: contact.notify,
          };
          userContacts.push(newContact);
        });
        await AsyncStorage.setItem(
          `@KeepUp:${userId}/reminders`,
          JSON.stringify(reminders)
        );
        await AsyncStorage.setItem(
          `@KeepUp:${userId}/contacts`,
          JSON.stringify(userContacts)
        );
        dispatch({
          type: DONE,
        });
        navigate("Loading");
      }
    });
};

export const addContactsToReminder = (contact) => async (dispatch) => {
  dispatch({
    type: ADD_CONTACT_TO_REMINDER,
    contact,
  });
};

export const setCompleted = (reminderId, token) => async (dispatch) => {
  fetch(
    `https://rocky-mesa-61495.herokuapp.com/reminders/${reminderId}/completed`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.response) {
        dispatch({
          type: SET_COMPLETED,
          id: reminderId,
        });
      }
    });
};

export const cancelReminder = () => async (dispatch) => {
  dispatch({ type: CANCEL });
  navigate("Home");
};

export const updateReminders = () => async (dispatch) => {
  fetch("http://localhost:3000/reminders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
