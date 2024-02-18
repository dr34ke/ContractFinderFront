import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Input from "../components/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { Post } from "../api/apiService";
import OwnButton from "../components/ownButton";

const EMPTY_USER: User = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState<User>(EMPTY_USER);

  const onChangeEmail = (e: string) => {
    setUser({ ...user, email: e });
  };
  const onChangePassword = (e: string) => {
    setUser({ ...user, password: e });
  };

  const login = async () => {
    try {
      await Post<User>(user, "/user/login", false);
      showMessage({
        message: "Zalogowano",
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Zaloguj się</Text>
        <Input
          placeHolder="Email"
          kbType="email-address"
          value={user.email}
          onChange={onChangeEmail}
        />
        <Input
          onChange={onChangePassword}
          placeHolder="Hasło"
          value={user.password}
          secure={true}
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
