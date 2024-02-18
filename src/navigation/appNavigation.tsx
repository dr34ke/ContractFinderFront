import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export type NavigatorProps = {
  Home: any;
  Login: any;
  Register: any;
};

const Stack = createNativeStackNavigator<NavigatorProps>();

const Navigator = () => {
  return (
    <NavigationContainer>
        <StatusBar translucent={false}/>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "ContractFinder" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Zaloguj się" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Zarejestruj się" }}
        />
      </Stack.Navigator>
      <FlashMessage  position={"top"}/> 
    </NavigationContainer>
  );
};

export default Navigator;
