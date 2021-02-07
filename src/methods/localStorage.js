import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const saveUserLocally = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = async () => {
  await AsyncStorage.removeItem("user");
};

export const getLocalUser = async () => {
  return JSON.parse(await AsyncStorage.getItem("user"));
};

export const setupAccountLocally = async (userId, contacts) => {
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
};

export const getLocalReminders = async (userId) => {
  return JSON.parse(await AsyncStorage.getItem(`@KeepUp:${userId}/reminders`));
};

export const saveRemindersLocally = async (userId, reminders) => {
  await AsyncStorage.setItem(
    `@KeepUp:${userId}/reminders`,
    JSON.stringify(reminders)
  );
};

export const addReminderLocally = async (userId, reminder) => {
  const reminders = getLocalReminders(userId);
  if (reminders) {
    reminders.push(reminder);
    await AsyncStorage.setItem(
      `@KeepUp:${userId}/reminders`,
      JSON.stringify(reminders)
    );
  }
};

export const getLocalContacts = async (userId) => {
  return JSON.parse(await AsyncStorage.getItem(`@KeepUp:${userId}/contacts`));
};
