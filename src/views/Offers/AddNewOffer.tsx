import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import useOffers from "../../stores/offersStore";
import OwnNumberInput from "../../components/ownNumberInput";
import OwnInput from "../../components/OwnInput";
import OwnSelect from "../../components/ownSelect";
import OwnSwitch from "../../components/ownSwitch";
import { Offer } from "../../models/Offer";
import OwnButton from "../../components/ownButton";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  PickLocation,
  PickLocationScreenNavigationProp,
  PickLocationStackParamList,
} from "./PickLocation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { showMessage } from "react-native-flash-message";
import { Post } from "../../api/apiService";
import UserStore from "../../stores/userStore";

const EMPTY_OFFER: Offer = {
  id: "",
  userId: "",
  categoryId: "",
  title: "",
  description: "",
  sugestedSalary: 0,
  isSalaryPerHour: false,
  isRepetetive: false,
  isFromWorker: false,
  onSite: false,
};

export default function AddNewOffer() {
  const Location = createNativeStackNavigator<PickLocationStackParamList>();

  return (
    <>
      <Location.Navigator>
        <Location.Screen
          name="AddNewForm"
          component={AddNewForm}
          options={{ headerShown: false }}
        />
        <Location.Screen
          name="PickLocation"
          component={PickLocation}
          options={{ title: "Wybierz lokalizacje" }}
        />
      </Location.Navigator>
    </>
  );
}

function AddNewForm() {
  const userId = UserStore((s) => s.user.id);
  const navigation = useNavigation<PickLocationScreenNavigationProp>();

  const [offer, setOffer] = useState<Offer>(EMPTY_OFFER);

  const [categories, setCategories] = useState<WorkCategory[]>([]);

  useEffect(()=>{
    setOffer({...offer, userId:userId??""})
  },[])

  const initCategories = useOffers((s) => s.initializeCategories);
  const categoriesStore = useOffers((s) => s.categories);

  const descritpionUpdate = (input: string) => {
    setOffer({ ...offer, description: input });
  };

  const titleUpdate = (input: string) => {
    setOffer({ ...offer, title: input });
  };

  const sphUpdate = (input: boolean) => {
    setOffer({ ...offer, isSalaryPerHour: input });
  };
  const repetitiveUpdate = (input: boolean) => {
    setOffer({ ...offer, isRepetetive: input });
  };
  const onSiteUpdate = (input: boolean) => {
    setOffer({ ...offer, onSite: !input, coordinates: null });
  };

  const categoryUpdate = (input: string) => {
    setOffer({ ...offer, categoryId: input });
  };

  const priceUpdate = (input: string) => {
    setOffer({ ...offer, sugestedSalary: parseFloat(input) });
  };
  const isFromWorkerUpdate = (input: string) => {
    if (input == "work") setOffer({ ...offer, isFromWorker: false });
    else setOffer({ ...offer, isFromWorker: true });
  };

  useEffect(() => {
    const setData = async () => {
      await initCategories();
    };
    setData();
  }, []);

  useEffect(() => {
    if (categoriesStore !== undefined) setCategories(categoriesStore);
  }, [categoriesStore]);

  const setCoordinates = (la: number, lo: number) => {
    setOffer({ ...offer, coordinates: [la, lo] });
  };

  const pickLocation = () => {
    navigation.navigate("PickLocation", { onSelectLocation: setCoordinates });
  };
  const saveOffer = async () => {
    try {
      await Post<Offer>(
        offer,
        "/offer",  
        true
      );
      showMessage({
        message: "Zapisano",
        type: "success",
        duration: 5000,
      });
    } catch (ex) {
      showMessage({
        message: ex as string,
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.heading}>Dodaj nową ofertę:</Text>
        <OwnSelect
          options={[{ label: "Pracy", value: "work" }]}
          onChange={isFromWorkerUpdate}
          value={offer.isFromWorker ? "" : "work"}
        />
        <View style={styles.container}>
          <OwnSelect
            options={categories?.map((item) => {
              return { label: item.name, value: item.id };
            })}
            description="Kategoria"
            onChange={categoryUpdate}
            value={offer.categoryId}
          />
          <OwnNumberInput
            description="Propozycja stawki"
            onChange={priceUpdate}
            value={offer.sugestedSalary}
          />
          <OwnSwitch
            description="Czy stawka jest za godzinę?"
            onChange={sphUpdate}
            value={offer.isSalaryPerHour}
          />
          <OwnSwitch
            description="Czy zlecenie jest wielorazowe?"
            onChange={repetitiveUpdate}
            value={offer.isRepetetive}
          />
          <OwnSwitch
            description="Czy zlecenie jest zdalne?"
            onChange={onSiteUpdate}
            value={!offer.onSite}
          />
          {offer.onSite&& <OwnButton
            title={`Wybierz lokalizacje ${
              offer?.coordinates
                ? `${offer?.coordinates[0].toFixed(
                    4
                  )}, ${offer?.coordinates[1].toFixed(4)}`
                : ""
            } `}
            onPress={pickLocation}
          />}
          <OwnInput
            label={"Tytuł"}
            onChange={titleUpdate}
            value={offer.title}
            nLines={1}
          />
          <OwnInput
            label={"Opis"}
            onChange={descritpionUpdate}
            value={offer.description}
            nLines={10}
          />
          <OwnButton title={"Zapisz"} onPress={saveOffer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    marginVertical: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
  },
  container: {
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
  descriptionInput: {
    borderWidth: 0.5,
    borderColor: "#000035",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlignVertical: "top",
  },
});
