import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";

const ProfileItem = (props) => {
  return (
    <View style={styles.labelContainer}>
      <TextComp style={styles.label}>{props.title}</TextComp>
      {props.data ? (
        <TextComp style={styles.text}>{props.data}</TextComp>
      ) : (
        <TextComp
          style={{
            ...styles.text,
            color: Colors.secondary,
            marginLeft: 2,
          }}
        >
          -
        </TextComp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginBottom: 5,
  },
  labelContainer: {
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default ProfileItem;
