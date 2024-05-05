import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useOffers from "../../stores/offersStore";
import OwnNumberInput from "../../components/ownNumberInput";
import OwnButton from "../../components/ownButton";
import OwnInput from "../../components/OwnInput";
import { Post } from "../../api/apiService";
import { showMessage } from "react-native-flash-message";
import UsersProfileStore from "../../stores/usersProfile";
import UserStore from "../../stores/userStore";


const EMPTY_APPLICATION : UserApplication= {
  userId: "",
  offerId:"",
  salaryOffer: 0,
  description: "",
}

export default function UserApply() {
  const offer = useOffers((s) => s.offer);
  const userId = UserStore((s) => s.user.id);

  const [application, setApplication]= useState<UserApplication>(EMPTY_APPLICATION);

  const descritpionUpdate = (input: string) => {
    setApplication({...application,description: input});
  };

  const priceUpdate = (input: string) => {
    setApplication({...application, salaryOffer: parseFloat(input)});
  };

  useEffect(()=>{
    setApplication({...application, offerId:offer?.id??"", userId:userId??""})
  },[])

  const apply = async ()=>{
    try {
      await Post<UserApplication>(
        application,
        "/offer-apply",  
        true
      );
      showMessage({
        message: "Zaaplikowano",
        type: "success",
        duration: 5000,
      });
    } catch (ex) {
      const json = JSON.parse(ex as string);
      showMessage({
        message: json.error as string,
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    }
  }


  return (
    <View>
      <Text style={styles.heading}>Aplikuj na ofertę:</Text>
      <Text style={styles.offerName}>{offer?.title}</Text>
      <View style={styles.container}>
        <OwnNumberInput description="Propozycja stawki" onChange={priceUpdate} value={application.salaryOffer}/>
        <OwnInput label={"Opis"} onChange={descritpionUpdate} value={application.description} nLines={10} />
        <OwnButton title="Aplikuj" onPress={apply} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 15,
    borderTopColor: "black",
    borderTopWidth: 0.5,
  },
  heading: {
    fontSize: 30,
    paddingHorizontal: 10,
  },
  offerName: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
