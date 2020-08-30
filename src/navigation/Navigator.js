import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
    Home: HomeScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    // initialRouteName: "SignUp",
  }
);

export default createAppContainer(Navigator);
