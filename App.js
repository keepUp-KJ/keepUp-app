import React, { useEffect, useState } from "react";
import Navigator from "./src/navigation/Navigator";
import { Provider, useDispatch } from "react-redux";
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

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    };
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);

  StatusBar.setBarStyle("dark-content");

  Fonts.loadAsync({
    regular: require("./assets/Lato-Regular.ttf"),
    bold: require("./assets/Lato-Black.ttf"),
  }).then(() => {
    setLoading(false);
  });

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted!");
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
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
