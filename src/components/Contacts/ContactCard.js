import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Overlay } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";

const ContactCard = (props) => {
  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={{
        ...styles.overlay,
        backgroundColor: "rgb(248, 249, 253)",
      }}
      onBackdropPress={() => {
        props.close();
      }}
    >
      <View style={styles.body}>
        <View style={styles.photo}>
          <Ionicons name="md-person" size={60} color="white" />
        </View>
        <Text
          style={{
            ...styles.text,
            fontSize: 25,
            textAlign: "center",
            fontWeight: "700",
          }}
          numberOfLines={2}
        >
          {props.contact.firstName} {props.contact.lastName}
        </Text>
        <Text
          style={{
            ...styles.text,
            color: Colors.secondary,
          }}
        >
          {props.contact.status ? "Accepted" : "Pending"}
        </Text>
        {props.pending ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="md-person-add" size={23} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-send" size={23} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-gift" size={23} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.pendingContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Frequency:{" "}
                <Text
                  style={{ color: Colors.primaryColor, fontWeight: "bold" }}
                >
                  {props.contact.frequency.toUpperCase()}
                </Text>
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Notify:
                <Text
                  style={{ fontWeight: "bold", color: Colors.primaryColor }}
                >
                  {" "}
                  ON THE SAME DAY
                </Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Futura",
    textAlign: "center",
  },
  textContainer: {
    marginVertical: 5,
  },
  body: {
    width: "95%",
    justifyContent: "center",
    marginVertical: 20,
    alignItems: "center",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  overlay: {
    width: Dimensions.get("window").width / 1.3,
    borderRadius: 35,
    alignItems: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  pendingContainer: {
    marginTop: 20,
  },
  btn: {
    backgroundColor: Colors.primaryColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactCard;
