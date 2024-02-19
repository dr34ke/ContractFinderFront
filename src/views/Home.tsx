import { useEffect } from "react"
import UserStore from "../stores/userStore";
import { View,Text } from "react-native";
import { showMessage } from "react-native-flash-message";

export default function Home() {
    const profile = UserStore((s)=>s.userProfile)
    const profileState = UserStore((s) => s.loginState);
    const initProfile = UserStore((s)=> s.initializeUserProfile)
    const profileResponse = UserStore((s)=>s.profileResponse)

    useEffect(()=>{
        const fetchData = async () => {
            await initProfile();
          }
          fetchData();
    },[])
    useEffect(()=>{
        showMessage({
            message: JSON.stringify(profile),
            type: "danger",
            duration: 5000,
            icon: "danger",
          });
    },[profile])

    return(
        <View>
            
        </View>
    )
}