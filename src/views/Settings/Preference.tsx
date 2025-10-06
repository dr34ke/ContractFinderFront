import { Switch, View, Text, StyleSheet } from "react-native";
import UserStore from "../../stores/userStore";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import OwnSwitch from "../../components/ownSwitch";
import OwnSelect from "../../components/ownSelect";
import OwnNumberInput from "../../components/ownNumberInput";
import React from "react";
import OwnButton from "../../components/ownButton";
import { Post } from "../../api/apiService";
import { useNavigation } from "@react-navigation/native";
import { NavigatorAFProps } from "../../navigation/appNavigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export default function Preference() {
  const preference = UserStore((s) => s.userPreference);
  const initPreference = UserStore((s) => s.initializeUserPreference);
  const unset = UserStore((s)=>s.unsetSettings)

  const navigation = useNavigation<DrawerNavigationProp<NavigatorAFProps>>();

  const [localPreference, setLocalPreference] = useState(preference);

  useEffect(()=>navigation.addListener('drawerItemPress', (e) => {
      unset();
      const fetchData = async () => {
        await initPreference();
      };
      fetchData().catch((ex) => {
        showMessage({
          message: JSON.stringify(ex),
          type: "danger",
          duration: 5000,
          icon: "danger",
        });
      });
      setLocalPreference(preference);
  }),[navigation])

  const save = async () => {
    try {
      await Post<UserPreference>(localPreference, "/user/update-preference", true);
      showMessage({
        message: "Zapisano preferencje",
        type: "success",
        duration: 5000,
      });
      unset();
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
      <View style={styles.contentContainer}>
        <OwnSwitch
          onChange={() =>
            setLocalPreference({
              ...localPreference,
              isEmailPublic: !localPreference.isEmailPublic,
            })
          }
          value={localPreference.isEmailPublic!}
          description="Czy chcesz aby email był publiczny?"
        />

        <OwnSwitch
          onChange={() =>
            setLocalPreference({
              ...localPreference,
              isPhonePublic: !localPreference.isPhonePublic,
            })
          }
          value={localPreference.isPhonePublic!}
          description="Czy chcesz aby telefon był publiczny?"
        />
        <OwnSelect
          description="Czego szukasz?"
          onChange={(value: "worker" | "employer" | undefined) =>
            setLocalPreference({
              ...localPreference,
              userType: value,
            })
          }
          options={[
            { label: "Pracy", value: "worker" },
            { label: "Pracownika", value: "employer" },
          ]}
          value={localPreference.userType}
        />
        <OwnNumberInput
          onChange={(value) =>
            setLocalPreference({
              ...localPreference,
              workDistance: value,
            })
          }
          value={localPreference.workDistance}
          description="Jak daleko jesteś gotów pracować?"
        />
      </View>

      <View style={styles.buttonContainer}>
        <OwnButton title={"Zapsiz"} onPress={() => save()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 5,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
});
