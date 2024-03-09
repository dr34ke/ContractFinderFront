import React, { useEffect, useState } from "react";
import { Get, Post } from "../../api/apiService";
import { showMessage } from "react-native-flash-message";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function CategoriesView() {
  const [categories, setCategories] = useState<WorkCategory[]>([]);

  useEffect(() => {
    getCategories();
    console.log(categories);
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
  return (
    <View style={styles.container}>
      {categories.map((category) => {
        return (
          <View style={styles.itemConteiner}>
            <Text style={styles.item}>{category.name}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.item}>0</Text>
              <Ionicons name="chevron-forward-outline" style={styles.icon}/>
            </View>
          </View>
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
