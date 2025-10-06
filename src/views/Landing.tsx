import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigatorBFProps } from "../navigation/appNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

export default function Landing() {
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorBFProps>>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Witaj w naszej innowacyjnej aplikacji, która zapewnia wyjątkowe
        doświadczenie zarówno osobom poszukującym pracy, jak i pracodawcom.
        Nasza platforma oferuje łatwe wyszukiwanie ofert pracy, zaawansowane
        algorytmy dopasowujące oraz możliwość bezpośredniego kontaktu pomiędzy
        kandydatami a pracodawcami. Zaczynamy już teraz - dołącz do nas!
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.button}
        >
          <Text>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.button}
        >
          <Text>Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 30,
  },
  btnContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: "50%",
    padding: 10,
    margin: 10,
  },
  text: {
    textAlign: "justify",
    fontSize: 17,
  },
});
