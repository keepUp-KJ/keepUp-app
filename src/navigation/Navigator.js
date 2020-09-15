import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PickContactsScreen from "../screens/PickContactsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/RenewPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import HomeScreen from "../screens/HomeScreen";

const Navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
    PickContacts: PickContactsScreen,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
    VerifyEmail: VerifyEmailScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(Navigator);
