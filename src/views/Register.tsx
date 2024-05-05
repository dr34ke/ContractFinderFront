import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import Input from "../components/Input";
import { Post } from "../api/apiService";
import { useRef, useState } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorBFProps } from "../navigation/appNavigation";
import OwnButton from "../components/ownButton";
import React from "react";

const EMPTY_USER: User = {
  firstName: "",
  email: "",
  lastName: "",
  password: "",
  phone: "",
};

export default function Register() {
  const [user, setUser] = useState<User>(EMPTY_USER);

  const navigation = useNavigation<NativeStackNavigationProp<NavigatorBFProps>>();
  
  const onChangeFName = (e: string) => {
    setUser({ ...user, firstName: e });
  };
  const onChangeLName = (e: string) => {
    setUser({ ...user, lastName: e });
  };
  const onChangeEmail = (e: string) => {
    setUser({ ...user, email: e });
  };
  const onChangePassword = (e: string) => {
    setUser({ ...user, password: e });
  };
  const onChangePhone = (e: string) => {
    setUser({ ...user, phone: e });
  };

  const register = async () => {
    try {
      await Post<User>(user, "/user/singup", false);
      showMessage({
        message: "Dodano użytkownika",
        type: "success",
        duration: 5000,
      });
      navigation.navigate("Login");
    } catch (ex) {
      const json = JSON.parse(ex as string);
      showMessage({
        message: json.error as string,
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Zarejestruj się</Text>
        <Input
          placeHolder="Email"
          kbType="email-address"
          value={user.email}
          onChange={onChangeEmail}
          iconName="mail-outline"
        />
        <Input
          onChange={onChangePassword}
          placeHolder="Hasło"
          value={user.password!}
          secure={true}
          iconName="finger-print-outline"
        />
        <Input
          placeHolder="Imie"
          value={user.firstName!}
          onChange={onChangeFName}
          iconName="person-outline"
        />
        <Input
          placeHolder="Nazwisko"
          value={user.lastName!}
          onChange={onChangeLName}
          iconName="person-outline"
        />
        <Input
          placeHolder="Telefon"
          kbType="phone-pad"
          value={user.phone!}
          onChange={onChangePhone}
          iconName="call-outline"
        />
        <OwnButton title="Zarejestruj się" onPress={register}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  formContainer: {
    width: "80%",
    alignSelf: "center",
  },
  text: {
    alignSelf: "flex-start",
    fontSize: 25,
    padding: 3,
  },
  button: {
    padding: 3,
  },
});
