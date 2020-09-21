import React, { useEffect } from "react";
import Navigator from "./src/navigation/Navigator";
import { Notifier } from "@airbrake/browser";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import usersReducer from "./src/store/reducers/users";

const rootReducer = combineReducers({
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const airbrake = new Notifier({
  projectId: 297602,
  projectKey: "c08de80cdcacbf61e9b1091b4590c1ae",
  environment: "production",
});

let App = () => {
  new Error("Hello from Airbrake!");
  useEffect(() => {
    try {
      fetch("https://keep-up-mock.herokuapp.com/api");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

App = airbrake.wrap(App);

export default App;
