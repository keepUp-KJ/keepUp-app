import React from "react";
import { Text } from "react-native";

const TextComp = (props) => {
  return (
    <Text
      {...props}
      style={{ ...props.style, fontFamily: props.bold ? "bold" : "regular" }}
    >
      {props.children}
    </Text>
  );
};

export default TextComp;
