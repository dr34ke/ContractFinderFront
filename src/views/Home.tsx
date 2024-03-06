import { useEffect } from "react"
import UserStore from "../stores/userStore";
import { View,Text } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigatorAFProps } from "../navigation/appNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function Home() {
    const profile = UserStore((s)=>s.userProfile)
    const profileState = UserStore((s) => s.profileState);
    const initProfile = UserStore((s)=> s.initializeUserProfile)


    const preference = UserStore((s)=>s.userPreference)
    const preferenceState = UserStore((s) => s.preferenceState);
    const initPreference = UserStore((s)=> s.initializeUserPreference)

    const navigation = useNavigation<NativeStackNavigationProp<NavigatorAFProps>>();

    useEffect(()=>{
        const fetchData = async () => {
            await initProfile();
            await initPreference();
          }
          fetchData().catch((ex)=>{
            showMessage({
                message: JSON.stringify(ex),
                type: "danger",
                duration: 5000,
                icon: "danger",
              });
          });
    },[])

    useEffect(()=>{
        if(preferenceState==="success" && profileState==="success")
        {
            console.log(preference.timeStamp)
            if(preference.timeStamp?.updatedAt===undefined){
                navigation.navigate("Preference");
            }
            if(profile.timeStamp?.updatedAt===undefined){
                navigation.navigate("Profile");
            }
        }    
    },[profileState, preferenceState])

    return(
        <View>
            <Text>{profileState}</Text>
        </View>
    )
}