import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import moment from "moment";

export const scheduleNotifications = (userSettings) => {
  const hours = parseInt(
    userSettings.general.reminderAt.substr(
      0,
      userSettings.general.reminderAt.indexOf(":")
    )
  );

  const minutes = parseInt(
    userSettings.general.reminderAt.substr(
      userSettings.general.reminderAt.indexOf(":") + 1,
      userSettings.general.reminderAt.length - 1
    )
  );

  if (Platform.OS === "ios") {
    //Daily Notification
    userSettings.notifications.dailyCalls
      ? Notifications.scheduleNotificationAsync({
          identifier: "daily",
          content: {
            title: "TODAY",
            body: "Don't forget to call your friends! Tap to view today's list",
          },
          trigger: {
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        })
      : Notifications.getAllScheduledNotificationsAsync().then((notif) => {
          if (notif.find((item) => item.identifier === "daily"))
            Notifications.cancelScheduledNotificationAsync("daily");
        });

    //Weekly Notification (Sunday by default)
    userSettings.notifications.weeklyCalls
      ? Notifications.scheduleNotificationAsync({
          identifier: "weekly",
          content: {
            title: "TODAY",
            body: "Don't forget to call your friends! Tap to view today's list",
          },
          trigger: {
            weekday: parseInt(userSettings.general.weeklyReminder) + 1,
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        })
      : Notifications.getAllScheduledNotificationsAsync().then((notif) => {
          if (notif.find((item) => item.identifier === "weekly"))
            Notifications.cancelScheduledNotificationAsync("weekly");
        });

    //Monthly Notification (Day 1 in the month by default)
    userSettings.notifications.monthlyCalls
      ? Notifications.scheduleNotificationAsync({
          identifier: "monthly",
          content: {
            title: "TODAY",
            body: "Don't forget to call your friends! Tap to view today's list",
          },
          trigger: {
            day: userSettings.general.monthlyReminder,
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        })
      : Notifications.getAllScheduledNotificationsAsync().then((notif) => {
          if (notif.find((item) => item.identifier === "monthly"))
            Notifications.cancelScheduledNotificationAsync("monthly");
        });

    //Daily Forgotten Notifications
    userSettings.notifications.incompleteTask
      ? Notifications.scheduleNotificationAsync({
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
        })
      : Notifications.getAllScheduledNotificationsAsync().then((notif) => {
          if (notif.find((item) => item.identifier === "forgotten"))
            Notifications.cancelScheduledNotificationAsync("forgotten");
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
  let notifyOn;

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
      title: `${occasion} with ${contacts[0].info.name} 
       ${
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
