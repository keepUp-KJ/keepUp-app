export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";
export const ERROR = "ERROR";
export const SET_COMPLETED = "SET_COMPLETED";
export const ADD_CONTACT_TO_REMINDER = "ADD_CONTACT_TO_REMINDER";
export const LOADING = "LOADING";
export const CANCEL = "CANCEL";
export const REMOVE_CONTACT_FROM_REMINDER = "REMOVE_CONTACT_FROM_REMINDER";
export const HIDE_REMINDER_ERROR = "HIDE_REMINDER_ERROR";

import api from "../../api";
import {
  getLocalReminders,
  saveRemindersLocally,
} from "../../methods/localStorage";
import { scheduleNotifications } from "../../methods/notifications";

export const getReminders = (userId, token) => async (dispatch) => {
  return fetch(`${api.URL}/reminders/${userId}`, {
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
    });
};

export const addReminder = (
  userId,
  date,
  contacts,
  occasion,
  notify,
  token
) => async (dispatch) => {
  dispatch({ type: LOADING });
  return fetch(`${api.URL}/reminders`, {
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
      notify,
    }),
  })
    .then((res) => res.json())
    .then(async (json) => {
      if (json.error) {
        dispatch({ type: ERROR, error: json.error });
      } else {
        dispatch({
          type: CREATE_REMINDER,
          reminder: json.reminder,
        });
      }
    });
};

export const hideError = () => async (dispatch) => {
  dispatch({
    type: HIDE_REMINDER_ERROR,
  });
};

export const setupAccount = (contacts, user) => async () => {
  return fetch(`${api.URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contacts,
      userId: user._id,
    }),
  })
    .then((res) => res.json())
    .then(async (json) => {
      if (!json.error) {
        scheduleNotifications(user.settings);
      }
    });
};

export const addContactsToReminder = (contact) => async (dispatch) => {
  dispatch({
    type: ADD_CONTACT_TO_REMINDER,
    contact,
  });
};

export const removeContactFromReminder = (contact) => async (dispatch) => {
  dispatch({
    type: REMOVE_CONTACT_FROM_REMINDER,
    contact,
  });
};

export const setCompleted = (reminderId, token) => async (dispatch) => {
  return fetch(`${api.URL}/reminders/${reminderId}/completed`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.reminder) {
        dispatch({
          type: SET_COMPLETED,
          reminder: json.reminder,
        });
      }
    });
};

export const cancelReminder = () => async (dispatch) => {
  dispatch({ type: CANCEL });
};
