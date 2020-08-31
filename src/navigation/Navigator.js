import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RenewPasswordScreen from "../screens/RenewPasswordScreen";

const Navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
    Home: HomeScreen,
    ForgotPassword: ForgotPasswordScreen,
    RenewPassword: RenewPasswordScreen,
  },
  {
    // initialRouteName: "RenewPassword",
  }
);

export default createAppContainer(Navigator);
