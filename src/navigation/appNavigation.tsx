import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../views/Login";
import Register from "../views/Register";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import UserStore from "../stores/userStore";
import Landing from "../views/Landing";
import Home from "../views/Home";

export type NavigatorBFProps = {
  Landing: any;
  Login: any;
  Register: any;
};

export type NavigatorAFProps = {
  Home: any;
};

const BfLogin = createNativeStackNavigator<NavigatorBFProps>();
const AfLogin = createNativeStackNavigator<NavigatorAFProps>();

const Navigator = () => {
  const initialized = UserStore((s) => s.userInitialized);
  if (initialized) {
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <AfLogin.Navigator>
          <AfLogin.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />
        </AfLogin.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={false} />
      <BfLogin.Navigator>
        <BfLogin.Screen
          name="Landing"
          component={Landing}
          options={{ title: "ContractFinder" }}
        />
        <BfLogin.Screen
          name="Login"
          component={Login}
          options={{ title: "Zaloguj się" }}
        />
        <BfLogin.Screen
          name="Register"
          component={Register}
          options={{ title: "Zarejestruj się" }}
        />
      </BfLogin.Navigator>
      <FlashMessage position={"top"} />
    </NavigationContainer>
  );
};

export default Navigator;
