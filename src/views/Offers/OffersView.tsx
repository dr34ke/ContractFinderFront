import { useEffect, useState } from "react";
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
import CategoriesView from "./CategoriesView";
import ListView from "./ListView";
import Map from "./MapView";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function OffersView() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Lista"
        component={ListView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
