import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Dropdown from "../Dropdown";
import Btn from "../Btn";
import TextComp from "../TextComp";

const ContactCard = (props) => {
  const [editing, setEditing] = useState(false);

  const frequencyItems = [
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
  ];
  const notifyItems = [
    {
      label: "On the same day",
      value: "On the same day",
    },
    {
      label: "One day before",
      value: "One day before",
    },
    {
      label: "One week before",
      value: "One week before",
    },
  ];

  const [frequencyValue, setFrequencyValue] = useState(props.contact.frequency);
  const [notifyValue, setNotifyValue] = useState(props.contact.notify);

  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        props.close();
      }}
    >
      <View style={{ marginVertical: 0 }}>
        <View style={styles.header}>
          {props.accepted ? (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setEditing(!editing);
                editing ? props.onEdit(frequencyValue, notifyValue) : null;
              }}
            >
              <TextComp style={(styles.headerText, styles.text)}>
                {editing ? "Done" : "Edit"}
              </TextComp>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.body}>
          {(props.pending || props.accepted) && (
            <View style={styles.photo}>
              <Ionicons name="md-person" size={60} color="white" />
            </View>
          )}
          <TextComp
            bold
            style={{
              ...styles.text,
              fontSize: 25,
              textAlign: "center",
            }}
            numberOfLines={2}
          >
            {props.contact.info.firstName} {props.contact.info.lastName}
          </TextComp>
          <TextComp
            style={{
              ...styles.text,
              color: Colors.secondary,
            }}
          >
            {props.contact.info.mobile}
          </TextComp>
          {props.pending ? (
            <View style={styles.container}>
              {/* Daily */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  props.onAccept("daily");
                }}
              >
                <Ionicons name="ios-today" size={23} color="white" />
              </TouchableOpacity>
              {/* Weekly */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  props.onAccept("weekly");
                }}
              >
                <MaterialIcons name="repeat" size={23} color="white" />
              </TouchableOpacity>
              {/* Monthly */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  props.onAccept("monthly");
                }}
              >
                <MaterialIcons name="repeat-one" size={23} color="white" />
              </TouchableOpacity>
            </View>
          ) : props.accepted ? (
            <View style={styles.acceptedContainer}>
              <View style={styles.textContainer}>
                <TextComp style={styles.text}>Frequency</TextComp>
                {editing ? (
                  <Dropdown
                    zIndex={2}
                    items={frequencyItems}
                    value={frequencyValue}
                    setValue={(item) => setFrequencyValue(item.value)}
                  />
                ) : (
                  <TextComp
                    bold
                    style={{ ...styles.text, ...styles.selectedValue }}
                  >
                    {frequencyValue.toUpperCase()}
                  </TextComp>
                )}

                <TextComp style={{ ...styles.text, marginTop: 20 }}>
                  Notify
                </TextComp>
                {editing ? (
                  <Dropdown
                    zIndex={1}
                    items={notifyItems}
                    value={notifyValue}
                    setValue={(item) => setNotifyValue(item.value)}
                  />
                ) : (
                  <TextComp
                    bold
                    style={{ ...styles.text, ...styles.selectedValue }}
                  >
                    {notifyValue.toUpperCase()}
                  </TextComp>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.rejectedContainer}>
              <Btn title="Unreject" btnColor={Colors.tomato} />
            </View>
          )}
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  textContainer: {
    marginVertical: 10,
  },
  headerText: {
    fontSize: 14,
  },
  header: {
    height: 30,
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  selectedValue: {
    marginTop: 5,
    color: Colors.primaryColor,
    fontSize: 16,
  },
  body: {
    width: "90%",
    justifyContent: "center",
    marginBottom: 30,
    alignSelf: "center",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    alignSelf: "center",
  },
  overlay: {
    width: Dimensions.get("window").width / 1.3,
    borderRadius: 35,
    backgroundColor: "rgb(248, 249, 253)",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  acceptedContainer: {
    marginTop: 20,
    height: 140,
  },
  rejectedContainer: {
    width: "100%",
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
