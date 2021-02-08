import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import moment from "moment";

export const scheduleNotifications = (userSettings) => {
  if (Platform.OS === "ios") {
    //Daily Notification
    userSettings.notifications.dailyCalls &&
      Notifications.scheduleNotificationAsync({
        identifier: "daily",
        content: {
          title: "TODAY",
          body: "Don't forget to call your friends! Tap to view today's list",
        },
        trigger: {
          hour: 17,
          minute: 0,
          repeats: true,
        },
      });

    //Weekly Notification (Sunday by default)
    userSettings.notifications.weeklyCalls &&
      Notifications.scheduleNotificationAsync({
        identifier: "weekly",
        content: {
          title: "TODAY",
          body: "Don't forget to call your friends! Tap to view today's list",
        },
        trigger: {
          weekday: userSettings.general.weeklyReminder,
          hour: 17,
          minute: 0,
          repeats: true,
        },
      });

    //Monthly Notification (Day 1 in the month by default)
    userSettings.notifications.monthlyCalls &&
      Notifications.scheduleNotificationAsync({
        identifier: "monthly",
        content: {
          title: "TODAY",
          body: "Don't forget to call your friends! Tap to view today's list",
        },
        trigger: {
          day: userSettings.general.monthlyReminder,
          hour: 17,
          minute: 0,
          repeats: true,
        },
      });

    //Daily Forgotten Notifications
    userSettings.notifications.incompleteTask &&
      Notifications.scheduleNotificationAsync({
        identifier: "forgotten",
        content: {
          title: "Incomplete Task",
          body:
            "You forgot to call your friends! Tap to view your forgotten tasks",
        },
        trigger: {
          hour: 0,
          minute: 0,
          repeats: true,
        },
      });
  }
};

export const cancelNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};

export const scheduleNewReminderNotification = (
  notify,
  date,
  occasion,
  contacts
) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  notify === "One week before"
    ? (notifyOn = new Date(moment(date).subtract(1, "w")))
    : notify === "One day before"
    ? (notifyOn = new Date(moment(date).subtract(1, "d")))
    : (notifyOn = date);

  Notifications.scheduleNotificationAsync({
    identifier: `${occasion}`,
    content: {
      body: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`,
      title: `${occasion} with ${contacts[0].info.firstName} ${
        contacts[0].info.lastName && contacts[0].info.lastName
      } ${
        contacts.length > 1
          ? `& ${contacts.length - 1} ${
              contacts.length !== 2 ? "others" : "other"
            }`
          : ""
      }`,
    },
    trigger: {
      day: notifyOn.getDate(),
      month: notifyOn.getMonth() + 1,
      year: notifyOn.getFullYear(),
      hour: 17,
      minute: 0,
    },
  });
};
