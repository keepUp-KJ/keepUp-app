import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Signup
import LoginScreen from "../screens/Signup/LoginScreen";
import SignupScreen from "../screens/Signup/SignupScreen";
import VerifyEmailScreen from "../screens/Signup/VerifyEmailScreen";
import LoadingScreen from "../screens/Signup/LoadingScreen";

//Account Setup
import PickRejected from "../screens/AccountSetup/PickRejected";
import PickContactsScreen from "../screens/AccountSetup/PickContactsScreen";
import PickWeeklyContacts from "../screens/AccountSetup/PickWeeklyContacts";
import PickMonthlyContacts from "../screens/AccountSetup/PickMonthlyContacts";
import ConfirmSelectionScreen from "../screens/AccountSetup/ConfirmSelectionScreen";
import SetupScreen from "../screens/AccountSetup/SetupScreen";

//Password Renewal
import ForgotPasswordScreen from "../screens/PasswordRenewal/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/PasswordRenewal/RenewPasswordScreen";

//Settings
import Settings from "../screens/Settings/Settings";
import NotificationsScreen from "../screens/Settings/NotificationsScreen";
import GeneralSettings from "../screens/Settings/GeneralSettings";
import ProfileScreen from "../screens/Settings/ProfileScreen";

import HomeScreen from "../screens/HomeScreen";
import ContactsScreen from "../screens/ContactsScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import CalendarScreen from "../screens/CalendarScreen";

const SettingsNavigator = createStackNavigator(
  {
    Settings: Settings,
    Notifications: NotificationsScreen,
    General: GeneralSettings,
    Profile: ProfileScreen,
  },
  { headerMode: "none" }
);

const SignupNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
  },
  { headerMode: "none" }
);

const AccountSetupNavigator = createStackNavigator(
  {
    PickRejected,
    PickContacts: PickContactsScreen,
    PickWeekly: PickWeeklyContacts,
    PickMonthly: PickMonthlyContacts,
    ConfirmSelection: ConfirmSelectionScreen,
  },
  { headerMode: "none" }
);

const Navigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: SignupNavigator,
    VerifyEmail: VerifyEmailScreen,
    PickRejected: AccountSetupNavigator,
    Home: HomeScreen,
    Contacts: ContactsScreen,
    Calendar: CalendarScreen,
    Setup: SetupScreen,
    AddReminder: AddReminderScreen,
    Settings: SettingsNavigator,
  },
  {
    // initialRouteName: "PickRejected",
  }
);

export default createAppContainer(Navigator);
