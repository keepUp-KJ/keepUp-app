import React from "react";
import Navigator from "./src/navigation/Navigator";

export default function App() {
  fetch("http://localhost:3000/api");

  return <Navigator />;
}
