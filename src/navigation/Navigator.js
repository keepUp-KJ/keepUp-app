import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const Navigator = createSwitchNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
});

export default createAppContainer(Navigator);
