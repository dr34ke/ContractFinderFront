import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { OfferDTO } from "../../models/OfferDTO";
import useOffers from "../../stores/offersStore";
import UsersProfileStore from "../../stores/usersProfile";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorOffersProps } from "./Offers";
import { Region } from "react-native-maps";
import * as Location from "expo-location";

export default function ListView() {
  const offers = useOffers((s) => s.offers);


  const [location, setLocation] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      ...location,
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  return (
    <ScrollView>
      {offers.map((offer, key) => {
        return <SingleRow offer={offer} key={key} location={location}/>;
      })}
    </ScrollView>
  );
}
interface Props {
  offer: OfferDTO;
  location: Region
}
function SingleRow({ offer, location }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();

  const initOffer = useOffers((s) => s.initializeOffer);
  const getUserProfile = UsersProfileStore((u) => u.getProfile);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfileDTO | undefined>(undefined);

  async function OpenDetails(){
    await initOffer(offer.id, location.latitude, location.longitude);
    navigation.navigate("Oferta");
}

  useEffect(() => {
    const download = async () => {
      const _user = await getUserProfile(offer.userId);
      setUser(_user);
    };
    download();
  }, [offer]);

  useEffect(() => {
    setImage(`data:image/png;base64,${user?.image}`);
  }, [user]);

  return (
    <TouchableOpacity style={styles.tile} onPress={OpenDetails}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.rowDetailsContainer}>
        <Text style={styles.underscore}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.underscore}>
          {offer.onSite===true?`${offer.distanceInKm.toFixed(1)} km`:"Zdalnie"}
        </Text>
      </View>
      <Text style={styles.ammount}>
        {offer.sugestedSalary} zł{offer.isSalaryPerHour ? `/h` : ``}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowDetailsContainer:{
    width: "68%",
    padding:3
  },
  underscore: {
    fontSize: 10,
  },
  tile: {
    alignItems: "center",
    flexDirection: "row",
    margin: 6,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    paddingBottom:10
  },
  title: {
    fontSize: 15,
    padding: 2,
  },
  ammount: {
    fontSize: 19,
    width: "17%",
  },
  image: {
    width: "15%",
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
});
