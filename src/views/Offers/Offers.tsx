import { useEffect } from "react";
import UserStore from "../../stores/userStore";
import { View, Text } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigatorAFProps } from "../../navigation/appNavigation";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "./MapView";
import ListView from "./ListView";
import CategoriesView from "./CategoriesView";

export default function Offers() {
  const profile = UserStore((s) => s.userProfile);
  const profileState = UserStore((s) => s.profileState);
  const initProfile = UserStore((s) => s.initializeUserProfile);

  const preference = UserStore((s) => s.userPreference);
  const preferenceState = UserStore((s) => s.preferenceState);
  const initPreference = UserStore((s) => s.initializeUserPreference);

  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorAFProps>>();

  const Tab = createBottomTabNavigator();
  const Categories = createNativeStackNavigator();

  useEffect(() => {
    const fetchData = async () => {
      await initProfile();
      await initPreference();
    };
    fetchData().catch((ex) => {
      showMessage({
        message: JSON.stringify(ex),
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    });
  }, []);

  useEffect(() => {
    if (preferenceState === "success" && profileState === "success") {
      console.log(preference.timeStamp);
      if (preference.timeStamp?.updatedAt === undefined) {
        navigation.navigate("Preference");
      }
      if (profile.timeStamp?.updatedAt === undefined) {
        navigation.navigate("Profile");
      }
    }
  }, [profileState, preferenceState]);

  function Offers() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Mapa" component={Map} />
        <Tab.Screen name="Lista" component={ListView} />
      </Tab.Navigator>
    );
  }

  return (
    <Categories.Navigator>
      <Categories.Screen name="Kategorie" component={CategoriesView} />
      <Categories.Screen name="ss" component={Offers} />
    </Categories.Navigator>
  );
}
