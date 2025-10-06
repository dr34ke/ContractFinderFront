import { useEffect } from "react";
import UserStore from "../../stores/userStore";
import { showMessage } from "react-native-flash-message";
import { NavigatorAFProps } from "../../navigation/appNavigation";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import CategoriesView from "./CategoriesView";
import OffersView from "./OffersView";
import OfferView from "./OfferView";
import UserProfileView from "../User/UserProfile";
import UserApply from "./UserApply";
import AddNewOffer from "./AddNewOffer";

export type NavigatorOffersProps = {
  Oferty: any;
  Kategorie:any,
  Oferta: any,
  Profil:any,
  Aplikuj:any,
  Dodaj: any,
};

export default function Offers() {
  const profile = UserStore((s) => s.userProfile);
  const profileState = UserStore((s) => s.profileState);
  const initProfile = UserStore((s) => s.initializeUserProfile);

  const preference = UserStore((s) => s.userPreference);
  const preferenceState = UserStore((s) => s.preferenceState);
  const initPreference = UserStore((s) => s.initializeUserPreference);

  const navi = useNavigation<NativeStackNavigationProp<NavigatorAFProps>>();


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
      if (preference.timeStamp?.updatedAt === undefined) {
        navi.navigate("Preference");
      }
      if (profile.timeStamp?.updatedAt === undefined) {
        navi.navigate("Profile");
      }
    }
  }, [profileState, preferenceState]);

  

  return (
    <Categories.Navigator>
      <Categories.Screen name="Kategorie" component={CategoriesView} options={{headerShown:false}} />
      <Categories.Screen name="Oferty" component={OffersView} options={{headerShown:false}}/>
      <Categories.Screen name="Oferta" component={OfferView} options={{headerShown:false}}/>
      <Categories.Screen name="Profil" component={UserProfileView} options={{headerShown:false}}/>
      <Categories.Screen name="Aplikuj" component={UserApply} options={{headerShown:false}}/>
      <Categories.Screen name="Dodaj" component={AddNewOffer} options={{headerShown:false}}/>
    </Categories.Navigator>
  );
}
