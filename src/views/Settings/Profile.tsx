import {
  View,
  PermissionsAndroid,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import UserStore from "../../stores/userStore";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import OwnButton from "../../components/ownButton";
import { Post } from "../../api/apiService";

export default function Profile() {
  const profile = UserStore((s) => s.userProfile);
  const profileState = UserStore((s) => s.profileState);
  const initProfile = UserStore((s) => s.initializeUserProfile);

  const [localProfile, setLocalProfile] = useState(profile);
  const unset = UserStore((s)=>s.unsetSettings)

  const openGallery = async () => {
    await requestImagesPermission();
    await requestExternalStoragePermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });
    if (result.canceled === false) {
      setLocalProfile({ ...localProfile, image: result.assets[0].base64! });
    }
  };
  const openCamera = async () => {
    await requestCameraPermission();
    await requestExternalStoragePermission();
    //const result = await ImagePicker.launchCamera({includeExtra:true,mediaType:"photo",includeBase64:false,maxWidth:300, maxHeight:300}, (r)=>{console.log(r)});
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    })
    if (result.canceled === false) {
      setLocalProfile({ ...localProfile, image: result.assets[0].base64! });
    }
  };

  const requestCameraPermission = async () => {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA))
      return;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Potrzebuje dostępu do twojej kamery",
          message: "Aby dodać zdjęcie musisz dać uprawnienia tej aplikacji",
          buttonNeutral: "Zapytaj później",
          buttonNegative: "Anuluj",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const requestImagesPermission = async () => {
    if (
      await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )
    )
      return;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Potrzebuje dostępu do twoich plików",
          message: "Aby dodać zdjęcie musisz dać uprawnienia tej aplikacji",
          buttonNeutral: "Zapytaj później",
          buttonNegative: "Anuluj",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const requestExternalStoragePermission = async () => {
    if (
      await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
    )
      return;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Potrzebuje dostępu do twoich plików",
          message: "Aby dodać zdjęcie musisz dać uprawnienia tej aplikacji",
          buttonNeutral: "Zapytaj później",
          buttonNegative: "Anuluj",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await initProfile();
    };
    fetchData().catch((ex) => {
      showMessage({
        message: JSON.stringify(ex),
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    });
  }, []);

  const onChangeText = (text: string) => {
    setLocalProfile({ ...localProfile, description: text });
  };


  const save =async ()=>{
    try {
      await Post<UserProfile>(localProfile, "/user/update-profile", true);
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
    <View style={styles.contentContainer}>
      <View style={styles.btnContainer}>
        <OwnButton title={"Dodaj z galerii"} onPress={() => openGallery()} />
        <OwnButton title={"Zrób zdjęcie"} onPress={() => openCamera()} />
      </View>
      <Image
        source={{ uri: `data:image/png;base64,${localProfile.image}` }}
        style={styles.image}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Opis:</Text>
        <TextInput
          editable
          multiline
          numberOfLines={10}
          maxLength={40}
          onChangeText={(text) => onChangeText(text)}
          value={localProfile.description}
          style={styles.textArea}
        />
      </View>
      <View style={styles.buttonFooterContainer}>
        <OwnButton title={"Zapsiz"} onPress={() => save()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "75%",
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
  btnContainer: {
    flexDirection: "row", 
    flex: 1,
  },
  descriptionContainer:{
    padding:10,
    paddingBottom:130
  },
  label:{
    fontSize:17
  },
  textArea:{
    borderColor:"#000035",
    backgroundColor:"#f8f8f8",
    borderWidth:0.5,
    borderRadius:10,
    paddingTop:5, 
    paddingLeft:10,
    paddingRight:10,
    textAlignVertical: 'top'
  },
  buttonFooterContainer: {
    paddingLeft: 5,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1, 
  }
});
