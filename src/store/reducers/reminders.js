import {
  SET_REMINDERS,
  DONE,
  SET_COMPLETED,
  ADD_CONTACT_TO_REMINDER,
  ERROR,
  CREATE_REMINDER,
  LOADING,
  CANCEL,
} from "../actions/reminders";
import * as Notifications from "expo-notifications";
import moment from "moment";

const initialState = {
  reminders: [],
  loading: null,
  contacts: [],
  error: "",
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders,
        loading: false,
      };
    }
    case DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_COMPLETED: {
      const today = moment().format("MMM DD, YYYY");

      const updatedReminders = state.reminders.filter(
        (reminder) => reminder._id !== action.id && reminder.date === today
      );

      if (updatedReminders.length === 0) {
        Notifications.cancelScheduledNotificationAsync("forgotten").then(() => {
          Notifications.scheduleNotificationAsync({
            identifier: "forgotten",
            content: {
              title: "YOU FORGOT YALAAA",
              body: "el so7ab f agaza",
            },
            trigger: {
              weekday: ((moment().day() + 2) % 7) + 1,
              hour: 0,
              minute: 0,
              repeats: true,
            },
          });
        });
      }

      return {
        ...state,
        reminders: updatedReminders,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ADD_CONTACT_TO_REMINDER: {
      if (!state.contacts.find((contact) => contact === action.contact)) {
        return {
          ...state,
          contacts: [...state.contacts, action.contact],
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case CREATE_REMINDER: {
      return {
        contacts: [],
        reminders: [...state.reminders, action.reminder],
      };
    }
    case CANCEL: {
      return {
        ...state,
        contacts: [],
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
