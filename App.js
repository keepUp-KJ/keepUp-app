import React, { useEffect, useState } from "react";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import usersReducer from "./src/store/reducers/users";
import remindersReducer from "./src/store/reducers/reminders";
import contactsReducer from "./src/store/reducers/contacts";
import settingsReducer from "./src/store/reducers/settings";
import { setNavigator } from "./src/navigation/navigationRef";
import { StatusBar, Text } from "react-native";
import * as Fonts from "expo-font";
import { ActivityIndicator, View } from "react-native";
import Colors from "./src/constants/Colors";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  reminders: remindersReducer,
  users: usersReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

let App = () => {
  const [loading, setLoading] = useState(true);

  StatusBar.setBarStyle("dark-content");

  Fonts.loadAsync({
    regular: require("./assets/Lato-Regular.ttf"),
    bold: require("./assets/Lato-Black.ttf"),
  }).then(() => {
    setLoading(false);
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Provider store={store}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primaryColor,
          }}
        >
          <Text style={{ fontSize: 50, marginBottom: 20, color: "white" }}>
            Keep Up
          </Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <Navigator
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      )}
    </Provider>
  );
};

export default App;
