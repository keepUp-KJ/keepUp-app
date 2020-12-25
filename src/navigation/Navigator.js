import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/Signup/LoginScreen";
import SignupScreen from "../screens/Signup/SignupScreen";
import VerifyEmailScreen from "../screens/Signup/VerifyEmailScreen";
import LoadingScreen from "../screens/Signup/LoadingScreen";

import PickContactsScreen from "../screens/AccountSetup/PickContactsScreen";
import PickWeeklyContacts from "../screens/AccountSetup/PickWeeklyContacts";
import PickMonthlyContacts from "../screens/AccountSetup/PickMonthlyContacts";
import ConfirmSelectionScreen from "../screens/AccountSetup/ConfirmSelectionScreen";
import SetupScreen from "../screens/AccountSetup/SetupScreen";

import ForgotPasswordScreen from "../screens/PasswordRenewal/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/PasswordRenewal/RenewPasswordScreen";

import SettingsScreen from "../screens/Settings/SettingsScreen";
import Settings from "../screens/Settings/Settings";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import GeneralSettings from "../screens/Settings/GeneralSettings";
import ProfileScreen from "../screens/Settings/ProfileScreen";

import HomeScreen from "../screens/HomeScreen";
import ContactsScreen from "../screens/ContactsScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import CalendarScreen from "../screens/CalendarScreen";

const Navigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    SignUp: SignupScreen,
    PickContacts: PickContactsScreen,
    PickWeekly: PickWeeklyContacts,
    PickMonthly: PickMonthlyContacts,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
    VerifyEmail: VerifyEmailScreen,
    Home: HomeScreen,
    // Settings: SettingsScreen,
    Contacts: ContactsScreen,
    ConfirmSelection: ConfirmSelectionScreen,
    Calendar: CalendarScreen,
    Setup: SetupScreen,
    AddReminder: AddReminderScreen,
    Settings: Settings,
    Notifications: NotificationsScreen,
    General: GeneralSettings,
    Profile: ProfileScreen,
  },
  {
    // initialRouteName: "RenewPassword",
  }
);

export default createAppContainer(Navigator);
