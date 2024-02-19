import * as SecureStore from "expo-secure-store";
import "regenerator-runtime/runtime";
import storage from "./StorageHelper";

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
export async function storeToken(token: string) {
  await SecureStore.setItemAsync("secure_token", token);
}
export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("secure_token");
}
export async function deleteToken() {
  await SecureStore.deleteItemAsync("secure_token");
}

export async function storeUser(user: User) {
  storage.save({
    key: "user",
    data: {
      user,
    },
  });
}
export async function getUserStorage(): Promise<User | undefined> {
  let user: User | undefined = undefined;
  storage
    .load({
      key: "user",
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true,
      },
    })
    .then((ret) => {
      user = ret.user;
    })
    .catch((err) => {
      deleteToken();
    });
  return user;
}
