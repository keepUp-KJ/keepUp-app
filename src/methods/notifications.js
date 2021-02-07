import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
