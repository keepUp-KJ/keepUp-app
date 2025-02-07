import {
  SET_REMINDERS,
  DONE,
  SET_COMPLETED,
  ADD_CONTACT_TO_REMINDER,
  ERROR,
  HIDE_REMINDER_ERROR,
  CREATE_REMINDER,
  LOADING,
  CANCEL,
  REMOVE_CONTACT_FROM_REMINDER,
} from "../actions/reminders";
import { UPDATE_REMINDERS } from "../actions/contacts";
import * as Notifications from "expo-notifications";
import moment from "moment";

const initialState = {
  reminders: [],
  loading: null,
  todayReminders: [],
  contacts: [],
  error: null,
};

const remindersReducer = (state = initialState, action) => {
  const today = moment().format("MMM DD, YYYY");

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
        todayReminders: action.reminders.filter(
          (reminder) => reminder.date === today
        ),
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
      const updatedReminders = state.reminders.filter(
        (reminder) => reminder._id !== action.reminder._id
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

      const reminder = state.reminders.find(
        (reminder) => reminder._id === action.reminder._id
      );
      reminder.date = action.reminder.date;

      if (reminder.occasion) reminder.completed = true;

      return {
        ...state,
        reminders: state.reminders,
        todayReminders: updatedReminders,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case HIDE_REMINDER_ERROR: {
      return {
        ...state,
        error: null,
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
    case REMOVE_CONTACT_FROM_REMINDER: {
      const updatedContacts = state.contacts.filter(
        (contact) => contact !== action.contact
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case CREATE_REMINDER: {
      let todayReminders = state.todayReminders;

      if (action.reminder.date === today) {
        todayReminders = [...state.todayReminders, action.reminder];
      }

      return {
        contacts: [],
        todayReminders,
        reminders: [...state.reminders, action.reminder],
        loading: false,
      };
    }
    case UPDATE_REMINDERS: {
      return {
        ...state,
        todayReminders:
          action.reminder.date === today
            ? [...state.todayReminders, action.reminder]
            : state.todayReminders,
        reminders: [...state.reminders, action.reminder],
      };
    }
    case CANCEL: {
      return {
        ...state,
        contacts: [],
        error: "",
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default remindersReducer;
