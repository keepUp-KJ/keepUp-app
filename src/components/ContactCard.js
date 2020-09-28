import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Overlay } from "react-native-elements";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";
import DropDownPicker from "react-native-dropdown-picker";

const ContactCard = (props) => {
  const [pressed, setPressed] = useState(false);
  const [value, setValue] = useState("");
  const dropdownItems = [
    {
      label: "Daily",
      value: "1",
    },
    {
      label: "Weekly",
      value: "2",
    },
    {
      label: "Monthly",
      value: "3",
    },
  ];

  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={{
        ...styles.overlay,
        backgroundColor: props.accepted
          ? Colors.primaryColor
          : props.pending
          ? Colors.secondary
          : null,
      }}
      onBackdropPress={() => {
        setPressed(false);
        props.close();
      }}
    >
      <View>
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={() => {
            setPressed(true);
          }}
        >
          <Ionicons />
          <Text style={{ ...styles.text, color: "white" }}>Edit</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <View style={styles.circle}>
            <View style={styles.innerCircle}>
              <View style={styles.photo}>
                <Ionicons name="md-person" size={60} color="#ccc" />
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            ...styles.text,
            marginTop: -60,
            fontSize: 32,
            textAlign: "center",
            color: props.pending ? "white" : Colors.secondary,
          }}
        >
          {props.contact.name}
        </Text>

        <View style={styles.container}>
          <Ionicons
            name="ios-calendar"
            color={props.accepted ? Colors.secondary : "white"}
            size={30}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              ...styles.text,
              fontWeight: "400",
              color: props.accepted ? Colors.secondary : "white",
            }}
          >
            12 JANUARY
          </Text>
        </View>

        {props.accepted ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ ...styles.text, ...styles.title }}>
              Frequency of Getting in Touch
            </Text>
            {!pressed ? (
              <Text style={{ ...styles.text, ...styles.input }}>WEEKLY</Text>
            ) : (
              <DropDownPicker
                style={{
                  width: "70%",
                  backgroundColor: null,
                  borderWidth: 0,
                }}
                items={dropdownItems}
                defaultValue={value}
                containerStyle={{
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: "white",
                  marginVertical: 5,
                }}
                itemStyle={{ justifyContent: "center" }}
                labelStyle={{
                  color: "white",
                  fontFamily: "Futura",
                  fontSize: 14,
                  textAlign: "center",
                }}
                arrowColor="white"
                selectedLabelStyle={{ fontWeight: "700" }}
                onChangeItem={(item) => setValue(item.value)}
              />
            )}
            <Text style={{ ...styles.text, ...styles.title }}>Relation</Text>

            {!pressed ? (
              <Text style={{ ...styles.text, ...styles.input }}>FAMILY</Text>
            ) : (
              <View style={{ width: "70%" }}>
                <Input placeholder="FAMILY" />
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 15,
            }}
          >
            <Ionicons
              name="ios-close-circle"
              size={80}
              color="#990000"
              onPress={props.onReject}
            />

            <Ionicons
              name="ios-checkmark-circle"
              size={80}
              color={Colors.primaryColor}
              onPress={props.onAccept}
            />
          </View>
        )}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(256,256,256,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(256,256,256,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Futura",
    fontWeight: "700",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 1.9,
    borderRadius: 35,
    alignItems: "center",
  },
  input: {
    color: "white",
    marginBottom: 10,
    marginTop: 2,
  },
  title: {
    color: "white",
    fontWeight: "200",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactCard;
