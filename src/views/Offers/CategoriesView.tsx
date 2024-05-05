import React, { useEffect, useState } from "react";
import { Get, Post } from "../../api/apiService";
import { showMessage } from "react-native-flash-message";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorOffersProps } from "./Offers";
import { OfferDTO } from "../../models/OfferDTO";
import useOffers from "../../stores/offersStore";
import * as Location from "expo-location";
import { Region } from "react-native-maps";
import UserStore from "../../stores/userStore";
import OwnButton from "../../components/ownButton";

export default function CategoriesView() {
  const [categories, setCategories] = useState<WorkCategory[]>([]);
  const initOffers = useOffers((s) => s.initializeOffers);

  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();

  const userPreference = UserStore((s) => s.userPreference);
  const initUserPreference = UserStore((s) => s.initializeUserPreference);

  const [location, setLocation] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      ...location,
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  useEffect(() => {
    if (userPreference !== undefined && location !== undefined)
      getCategories(
        location.latitude,
        location.longitude,
        userPreference?.workDistance ?? 100
      );
  }, [location, userPreference]);

  useEffect(() => {
    const setData = async () => {
      await initUserPreference();
      await getLocation();
    };
    setData();
  }, []);
  const getCategories = async (
    latitude: number,
    longitude: number,
    distance: number
  ) => {
    try {
      var response = await Get<WorkCategory[]>(
        `/categories?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
        true
      );
      setCategories(response);
    } catch (ex) {
      showMessage({
        message: JSON.parse(ex as string),
        type: "danger",
        duration: 5000,
        icon: "success",
      });
    }
  };

  const setCategory = async (
    _id: string,
    latitude: number,
    longitude: number,
    distance: number
  ) => {
    await initOffers(_id, latitude, longitude, distance);
    navigation.navigate("Oferty");
  };

  const addOffer=()=>{
    navigation.navigate("Dodaj");
  }

  return (
    <View style={{height:"100%"}}>
      <OwnButton title="Dodaj oferte" onPress={addOffer} />
      <View style={styles.container}>
        {categories.map((category) => {
          return (
            <TouchableOpacity
              style={styles.itemConteiner}
              key={category.id}
              onPress={() =>
                setCategory(
                  category.id,
                  location.latitude,
                  location.longitude,
                  userPreference?.workDistance ?? 100
                )
              }
            >
              <Text style={styles.item}>{category.name}</Text>
              <View style={styles.countContainer}>
                <Text style={styles.item}>{category.offersCount}</Text>
                <Ionicons name="chevron-forward-outline" style={styles.icon} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
  },
  countContainer: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    height:"100%",
  },
  item: {
    fontSize: 17,
  },
  itemConteiner: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
});
