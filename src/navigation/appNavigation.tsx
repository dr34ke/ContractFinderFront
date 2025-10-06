import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../views/Login";
import Register from "../views/Register";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import UserStore from "../stores/userStore";
import Landing from "../views/Landing";
import Home from "../views/Offers/Offers";
import Profile from "../views/Settings/Profile";
import Preference from "../views/Settings/Preference";
import { TouchableOpacity, View, Text } from "react-native";

export type NavigatorBFProps = {
  Landing: any;
  Login: any;
  Register: any;
};

export type NavigatorAFProps = {
  Home: any;
  Preference: any;
  Profile: any;
};

const BfLogin = createNativeStackNavigator<NavigatorBFProps>();
const Drawer = createDrawerNavigator<NavigatorAFProps>();

/**/

const Navigator = () => {
  const initialized = UserStore((s) => s.userInitialized);
  if (initialized) {
    return (
      <>
        <StatusBar translucent={true} />
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} options={{title:"Oferty"}}/>
            <Drawer.Screen name="Profile" component={Profile} options={{
              title:"Profil"
            }}/>
            <Drawer.Screen name="Preference" component={Preference} options={{
              title:"Preferencje"
            }}/>
          </Drawer.Navigator>
        </NavigationContainer>
        <FlashMessage position={"top"} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={true} />
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

function renderMenu(navigation: NativeStackNavigationProp<NavigatorAFProps>) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Text>Hej</Text>
    </TouchableOpacity>
  );
}

export default Navigator;
