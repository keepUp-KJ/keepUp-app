import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import TextComp from "./TextComp";
import { Ionicons } from "@expo/vector-icons";

const Input = (props) => {
  const [borderColor, setBorderColor] = useState(Colors.secondary);
  const [borderWidth, setBorderWidth] = useState(0.5);

  return (
    <View>
      {props.title && (
        <TextComp
          style={{
            paddingLeft: 10,
            fontSize: 14,
            color: "grey",
          }}
        >
          {props.title}
        </TextComp>
      )}
      <View
        style={{
          ...props.style,
          ...styles.input,
          borderWidth,
          borderColor: props.error ? "#990000" : borderColor,
        }}
      >
        <TextInput
          {...props}
          autoCorrect={false}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          autoFocus={props.auto}
          blurOnSubmit={true}
          onFocus={() => {
            setBorderColor(Colors.primaryColor);
            setBorderWidth(2);
          }}
          onBlur={() => {
            setBorderColor(Colors.secondary);
            setBorderWidth(0.5);
            Keyboard.dismiss();
          }}
          style={{
            fontFamily: "regular",
            width: props.search && props.searchInput !== "" ? "85%" : "100%",
            padding: 10,
            paddingHorizontal: 20,
          }}
        />
        {props.search && props.searchInput !== "" && (
          <TouchableOpacity
            onPress={props.onDeleteSearch}
            style={styles.eraseBtn}
          >
            <Ionicons name="ios-close-circle" size={25} color="#e6e6e6" />
          </TouchableOpacity>
        )}
      </View>
      {!props.search && (
        <TextComp style={styles.errorText}>{props.error}</TextComp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    paddingHorizontal: 12,
    color: "#990000",
    fontSize: 10,
  },
  eraseBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    padding: 5,
  },
});

export default Input;
