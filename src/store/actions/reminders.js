export const SET_REMINDERS = "SET_REMINDERS";
export const CREATE_REMINDER = "CREATE_REMINDER";

import { AsyncStorage } from "react-native";
import { navigate } from "../../navigation/navigationRef";
import moment from "moment";

export const getReminders = (userId) => async (dispatch) => {
  console.log();

  await AsyncStorage.getItem(
    `@KeepUp:${userId}/ContactReminders`,
    (err, result) => {
      if (result) {
        dispatch({
          type: SET_REMINDERS,
          reminders: JSON.parse(result),
        });
      } else {
        fetch(`https://rocky-mesa-61495.herokuapp.com/reminders/${userId}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((json) => {
            dispatch({
              type: SET_REMINDERS,
              reminders: json.reminders,
            });
          });
      }
    }
  );
};

export const addReminder = (date, contact, occasion, notify) => async (
  dispatch
) => {
  fetch("https://rocky-mesa-61495.herokuapp.com/api/reminders", {
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
    .then((json) => {
      if (!json.error) {
        const contactReminders = [];
        contacts.map((contact) => {
          const reminder = {
            date:
              contact.frequency === "weekly"
                ? moment().add(7, "days").format("MMM DD, YYYY")
                : contact.frequency === "monthly"
                ? moment().add(30, "days").format("MMM DD, YYYY")
                : moment().format("MMM DD, YYYY"),
            contacts: [
              {
                id: contact.contact.id,
                firstName: contact.contact.firstName,
                lastName: contact.contact.lastName,
              },
            ],
            occasion: null,
            notify: "On the same day",
            completed: false,
          };
          contactReminders.push(reminder);
        });
        AsyncStorage.setItem(
          `@KeepUp:${userId}/ContactReminders`,
          JSON.stringify(contactReminders)
        );
      }
    });
};

export const addContactsToReminder = () => async (dispatch) => {};
