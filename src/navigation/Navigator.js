import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PickContactsScreen from "../screens/PickContactsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/RenewPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import CreateReminderScreen from "../screens/CreateReminderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import SetupScreen from "../screens/SetupAccount";
import CalendarScreen from "../screens/CalendarScreen";
import LoadingScreen from "../screens/LoadingScreen";
import Home from "../screens/Home";

const Navigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    SignUp: SignupScreen,
    PickContacts: PickContactsScreen,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
    VerifyEmail: VerifyEmailScreen,
    Home: Home,
    CreateReminder: CreateReminderScreen,
    Settings: SettingsScreen,
    Contacts: ContactsScreen,
    Setup: SetupScreen,
    Calendar: CalendarScreen,
  },
  {
    // initialRouteName: "Home",
  }
);

export default createAppContainer(Navigator);
