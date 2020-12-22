import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PickContactsScreen from "../screens/PickContactsScreen";
import PickWeeklyContacts from "../screens/PickWeeklyContacts";
import PickMonthlyContacts from "../screens/PickMonthlyContacts";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/RenewPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import CreateReminderScreen from "../screens/CreateReminderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import ConfirmSelectionScreen from "../screens/ConfirmSelectionScreen";
import CalendarScreen from "../screens/CalendarScreen";
import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import SetupScreen from "../screens/SetupScreen";
import AddReminderScreen from "../screens/AddReminderScreen";

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
    CreateReminder: CreateReminderScreen,
    Settings: SettingsScreen,
    Contacts: ContactsScreen,
    ConfirmSelection: ConfirmSelectionScreen,
    Calendar: CalendarScreen,
    Setup: SetupScreen,
    AddReminder: AddReminderScreen,
  },
  {
    initialRouteName: "AddReminder",
  }
);

export default createAppContainer(Navigator);
