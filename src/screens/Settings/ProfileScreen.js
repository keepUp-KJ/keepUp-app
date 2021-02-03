import React, { Fragment } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../../components/TextComp";
import { ScrollView } from "react-native-gesture-handler";

class ProfileScreen extends React.Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ backgroundColor: Colors.primaryColor }} />
        <SafeAreaView style={styles.screen}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
              style={styles.backContainer}
            >
              <Ionicons name="md-arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.container}>
              <TextComp bold style={styles.title}>
                Profile
              </TextComp>
            </View>
          </View>
          <ScrollView style={styles.body}>
            <View>
              <View style={styles.labelContainer}>
                <TextComp style={styles.label}>First Name</TextComp>
                {this.props.user.firstName ? (
                  <TextComp style={styles.text}>
                    {this.props.user.firstName}
                  </TextComp>
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
              <View style={styles.labelContainer}>
                <TextComp style={styles.label}>Last Name</TextComp>
                {this.props.user.lastName ? (
                  <TextComp style={styles.text}>
                    {this.props.user.lastName}
                  </TextComp>
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
              <View style={styles.labelContainer}>
                <TextComp style={styles.label}>Email</TextComp>
                <TextComp style={styles.text}>{this.props.user.email}</TextComp>
              </View>
              <View style={styles.labelContainer}>
                <TextComp style={styles.label}>Mobile</TextComp>
                {this.props.user.mobile ? (
                  <TextComp style={styles.text}>
                    {this.props.user.mobile}
                  </TextComp>
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  backContainer: {
    marginHorizontal: 20,
    marginTop: 5,
    justifyContent: "center",
    width: "5%",
  },
  header: {
    flex: 0.25,
    backgroundColor: Colors.primaryColor,
  },
  container: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 35,
  },
  body: {
    flex: 0.7,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginBottom: 5,
  },
  labelContainer: {
    marginVertical: 20,
  },
  btnContainer: {
    flex: 0.3,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
