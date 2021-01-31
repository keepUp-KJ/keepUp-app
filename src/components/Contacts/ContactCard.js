import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Overlay } from "react-native-elements";
import Colors from "../../constants/Colors";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Dropdown from "../Dropdown";
import Btn from "../Btn";
import TextComp from "../TextComp";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";

const ContactCard = (props) => {
  const [editing, setEditing] = useState(false);
  const [weeklyValue, setWeeklyValue] = useState("sunday");
  const [dailyValue, setDailyValue] = useState(Date.now());
  const [frequencyValue, setFrequencyValue] = useState(props.contact.frequency);

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
  const weeklyItems = [
    {
      label: "Sunday",
      value: "sunday",
    },
    {
      label: "Monday",
      value: "monday",
    },
    {
      label: "Tuesday",
      value: "tuesday",
    },
    {
      label: "Wednesday",
      value: "wednesday",
    },
    {
      label: "Thursday",
      value: "thursday",
    },
    {
      label: "Friday",
      value: "friday",
    },
    {
      label: "Saturday",
      value: "saturday",
    },
  ];

  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        props.close();
      }}
    >
      <View>
        {/* <View style={styles.header}>
          {props.accepted ? (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setEditing(!editing);
                editing ? props.onEdit(frequencyValue) : null;
              }}
            >
              <TextComp style={(styles.headerText, styles.text)}>
                {editing ? "Done" : "Edit"}
              </TextComp>
            </TouchableOpacity>
          ) : null}
        </View> */}
        <View style={styles.body}>
          {(props.pending || props.accepted) && (
            <View style={styles.photo}>
              {/* {props.contact.info.imageAvailable ? (
                <Image
                  source={{ uri: props.contact.info.image.uri }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : ( */}
              <Ionicons name="md-person" size={60} color="white" />
              {/* )} */}
            </View>
          )}
          <TextComp
            bold
            style={{ ...styles.text, fontSize: 25, textAlign: "center" }}
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
            {props.contact.info.phoneNumbers[0].number}
          </TextComp>
          {props.pending ? (
            <View style={styles.container}>
              {/* Daily */}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    props.onAccept("daily");
                  }}
                >
                  <MaterialIcons name="today" size={23} color="white" />
                </TouchableOpacity>
                <TextComp>Daily</TextComp>
              </View>
              {/* Weekly */}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    props.onAccept("weekly");
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-week"
                    size={23}
                    color="white"
                  />
                </TouchableOpacity>
                <TextComp>Weekly</TextComp>
              </View>
              {/* Monthly */}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    props.onAccept("monthly");
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={23}
                    color="white"
                  />
                </TouchableOpacity>
                <TextComp>Monthly</TextComp>
              </View>
              {/* Reject */}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={{ ...styles.btn, backgroundColor: Colors.tomato }}
                  onPress={() => {
                    props.onReject();
                  }}
                >
                  <MaterialIcons name="close" size={23} color="white" />
                </TouchableOpacity>
                <TextComp>Reject</TextComp>
              </View>
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
              </View>
              {/* <View style={styles.textContainer}>
                <TextComp style={styles.text}>Remind on</TextComp>
                {editing ? (
                  props.contact.frequency === "weekly" ? (
                    <Dropdown
                      zIndex={2}
                      items={weeklyItems}
                      value={weeklyValue}
                      setValue={(item) => setWeeklyValue(item.value)}
                    />
                  ) : props.contact.frequency === "daily" ? (
                    <DateTimePicker
                      style={{ height: 50 }}
                      value={dailyValue}
                      display="spinner"
                      mode="time"
                      onChange={onChange}
                    />
                  ) : null
                ) : (
                  <TextComp
                    bold
                    style={{ ...styles.text, ...styles.selectedValue }}
                  >
                    {props.contact.frequency === "weekly"
                      ? weeklyValue.toUpperCase()
                      : dailyValue}
                  </TextComp>
                )}
              </View> */}
            </View>
          ) : (
            <View style={styles.rejectedContainer}>
              <Btn
                title="Remove from blacklist"
                btnColor={Colors.tomato}
                onPress={props.onRemove}
              />
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
    fontSize: 16,
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
    marginVertical: 30,
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
    overflow: "hidden",
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
    height: 60,
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
    marginBottom: 5,
  },
  btnContainer: {
    alignItems: "center",
  },
});

export default ContactCard;
