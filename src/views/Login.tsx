import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { Post } from "../api/apiService";
import OwnButton from "../components/ownButton";
import { getToken, storeToken } from "../helpers/TokenHelper";
import UserStore from "../stores/userStore";
import React from "react";

const EMPTY_USER: User = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState<User>(EMPTY_USER);

  const loginState = UserStore((s) => s.loginState);
  const loginResponse = UserStore((s) => s.loginResponse);
  const initializeUser = UserStore((s) => s.initializeUser);

  const onChangeEmail = (e: string) => {
    setUser({ ...user, email: e });
  };
  const onChangePassword = (e: string) => {
    setUser({ ...user, password: e });
  };

  const login = async () => {
    await initializeUser(user.email, user.password);
  };

  useEffect(() => {
    if (loginState === "error") {
      showMessage({
        message: loginResponse,
        type: "danger",
        duration: 5000,
        icon: "success",
      });
    }
    else if(loginState==="success"){
      showMessage({
        message: "Zalogowano",
        type: "success",
        duration: 5000,
        icon: "danger",
      })
    }
  }, [loginState]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Zaloguj się</Text>
        <Input
          placeHolder="Email"
          kbType="email-address"
          value={user.email}
          onChange={onChangeEmail}
          iconName="log-in-outline"
        />
        <Input
          onChange={onChangePassword}
          placeHolder="Hasło"
          value={user.password}
          secure={true}
          iconName="finger-print-outline"
        />
        <OwnButton title="Zaloguj się" onPress={login} />
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
