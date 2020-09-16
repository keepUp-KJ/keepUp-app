import React from "react";
import Navigator from "./src/navigation/Navigator";
import { Notifier } from "@airbrake/browser";

const airbrake = new Notifier({
  projectId: 297602,
  projectKey: "c08de80cdcacbf61e9b1091b4590c1ae",
  environment: "production",
});

export default function App() {
  fetch("https://keep-up-mock.herokuapp.com/api");

  return <Navigator />;
}
