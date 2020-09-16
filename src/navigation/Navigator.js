import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PickContactsScreen from "../screens/PickContactsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/RenewPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";

const Navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
    PickContacts: PickContactsScreen,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
    VerifyEmail: VerifyEmailScreen,
    Home: HomeScreen,
    Settings: SettingsScreen,
    Contacts: ContactsScreen,
  },
  {
    // initialRouteName: "Home",
  }
);

export default createAppContainer(Navigator);
