import React from "react";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import usersReducer from "./src/store/reducers/users";
import remindersReducer from "./src/store/reducers/reminders";
import contactsReducer from "./src/store/reducers/contacts";
import settingsReducer from "./src/store/reducers/settings";
import { setNavigator } from "./src/navigation/navigationRef";
import { StatusBar } from "react-native";
import * as Fonts from "expo-font";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  reminders: remindersReducer,
  users: usersReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

Fonts.loadAsync({
  regular: require("./assets/Lato-Regular.ttf"),
  bold: require("./assets/Lato-Black.ttf"),
});

let App = () => {
  StatusBar.setBarStyle("dark-content");

  return (
    <Provider store={store}>
      <Navigator
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};

export default App;
