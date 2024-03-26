import React, { useEffect, useState } from "react";
import { Get, Post } from "../../api/apiService";
import { showMessage } from "react-native-flash-message";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorOffersProps } from "./Offers";
import { Offer } from "../../models/Offer";
import useOffers from "../../stores/offersStore";


export default function CategoriesView() {
  const [categories, setCategories] = useState<WorkCategory[]>([]);
  const initOffer = useOffers((s)=>s.initializeOffers)
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();
  
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      var response = await Get<WorkCategory[]>("/categories", true);
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


  const setCategory = async (_id:string) =>{
    initOffer(_id);
    navigation.navigate("Oferty")
  }

  return (
    <View style={styles.container}>
      {categories.map((category) => {
        return (
          <TouchableOpacity style={styles.itemConteiner} key={category.id} onPress={()=>setCategory(category.id)}>
            <Text style={styles.item}>{category.name}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.item}>{category.offersCount}</Text>
              <Ionicons name="chevron-forward-outline" style={styles.icon}/>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    icon:{
        fontSize:22,
    },
  countContainer: {
    flexDirection:"row"
  },
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  item: {
    fontSize: 17,
  },
  itemConteiner: {
    flexDirection: "row",
    alignItems:"center",
    height: 50,
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
});
