import React from "react";
import Navigator from "./src/navigation/Navigator";

export default function App() {
  fetch("https://keep-up-mock.herokuapp.com/api");

  return <Navigator />;
}
