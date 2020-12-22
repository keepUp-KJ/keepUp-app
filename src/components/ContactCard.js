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
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";

const ContactCard = (props) => {
  const [pressed, setPressed] = useState(false);
  const [relation, setRelation] = useState("NOT SPECIFIED");
  const [value, setValue] = useState("WEEKLY");
  const dropdownItems = [
    {
      label: "DAILY",
      value: "DAILY",
    },
    {
      label: "WEEKLY",
      value: "WEEKLY",
    },
    {
      label: "MONTHLY",
      value: "MONTHLY",
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
      <View style={{ flex: 1, width: "95%", justifyContent: "center" }}>
        {props.accepted ? (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Entypo
              name="circle-with-minus"
              size={30}
              color="#990000"
              onPress={props.remove}
            />
            <TouchableOpacity
              onPress={() => {
                !pressed ? setPressed(true) : setPressed(false);
              }}
            >
              <Text style={{ ...styles.text, color: "white" }}>
                {pressed ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

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
            color: props.pending ? "white" : Colors.secondary,
          }}
        >
          {props.contact.firstName + " " + props.contact.lastName}
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
          <View
            style={{
              marginTop: 20,
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ alignItems: "center", zIndex: 1 }}>
              <Text style={{ ...styles.text, ...styles.title }}>
                Frequency of Getting in Touch
              </Text>
              {!pressed ? (
                <Text style={{ ...styles.text, ...styles.label }}>{value}</Text>
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
                    fontFamily: "Futura",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                  arrowColor="white"
                  selectedLabelStyle={{ fontWeight: "700", color: "white" }}
                  onChangeItem={(item) => setValue(item.value)}
                />
              )}
            </View>

            <View style={{ alignItems: "center", zIndex: 0 }}>
              <Text style={{ ...styles.text, ...styles.title }}>Relation</Text>

              {!pressed ? (
                <Text style={{ ...styles.text, ...styles.label }}>
                  {relation.toUpperCase()}
                </Text>
              ) : (
                <View style={{ width: "70%" }}>
                  <TextInput
                    placeholder="eg. family"
                    style={styles.input}
                    value={relation}
                    onChangeText={(text) => {
                      setRelation(text);
                    }}
                  />
                </View>
              )}
            </View>
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
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={props.onReject}
              activeOpacity={0.6}
            >
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  alignSelf: "center",
                }}
                name="checkbox-blank-circle"
                size={50}
                color="white"
              />
              <Ionicons name="ios-close-circle" size={80} color="#990000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={props.onAccept}
              activeOpacity={0.6}
            >
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  alignSelf: "center",
                }}
                name="checkbox-blank-circle"
                size={50}
                color="white"
              />
              <Ionicons
                name="ios-checkmark-circle"
                size={80}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
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
    textAlign: "center",
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
  label: {
    color: "white",
    marginBottom: 10,
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    marginVertical: 5,
    borderRadius: 30,
    textAlign: "center",
    color: "white",
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
