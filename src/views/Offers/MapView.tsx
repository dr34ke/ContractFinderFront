import React from "react";
import {
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { OfferDTO } from "../../models/OfferDTO";
import useOffers from "../../stores/offersStore";
import UsersProfileStore from "../../stores/usersProfile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorOffersProps } from "./Offers";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export default function Map() {
  const offers = useOffers((s) => s.offers);
  const [location, setLocation] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserProfile = UsersProfileStore((u) => u.getProfile);



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

  const [selectedOffer, setSelectedOffer] = useState<OfferDTO | undefined>(
    undefined
  );

  return (
    <View style={styles.container}>
      <View style={styles.myMap}>
        <MapView
          region={location}
          style={styles.map}
          showsUserLocation
          mapType={Platform.OS == "ios" ? "none" : "standard"}
        >
          {offers.map((offer, key) => {
            {
              offer.onSite;
            }
            return offer.onSite ? (
              <Marker
                key={key}
                coordinate={{
                  latitude: Number(offer.coordinates[0]),
                  longitude: Number(offer.coordinates[1]),
                }}
                onPress={() => setSelectedOffer(offer)}
              />
            ) : (
              <></>
            );
          })}
        </MapView>
        {selectedOffer && <DetailView offer={selectedOffer} onClose={()=>setSelectedOffer(undefined)} location={location}></DetailView>}
      </View>
    </View>
  );
}
interface Props {
  offer: OfferDTO;
  onClose: ()=>void,
  location:Region
}
function DetailView({ offer, onClose, location }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();

  const initOffer = useOffers((s) => s.initializeOffer);

  const getUserProfile = UsersProfileStore((u) => u.getProfile);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfileDTO | undefined>(undefined);

  useEffect(() => {
    const download = async () => {
      const _user = await getUserProfile(offer.userId);
      setUser(_user);
    };
    download();
  }, [offer]);


  async function OpenDetails(offerId:string){
      await initOffer(offerId, location.latitude, location.longitude);
      navigation.navigate("Oferta");
  }

  useEffect(() => {
    setImage(`data:image/png;base64,${user?.image}`);
  }, [user]);
  return (
    <View style={styles.detailView}>
      <View style={styles.cardTop}>
        <View style={styles.cardTopRow}>
          <Image source={{ uri: image }} style={styles.image} />
          <View>
            <View style={styles.cardNavigationBar}>
              <Text style={styles.underscore}>
                {user?.first_name} {user?.last_name}
              </Text>
              <StarRatingDisplay rating={user?.rating ?? 0} starSize={15} />
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close-outline" style={styles.close} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{offer.title}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.underscore}>{offer.description}</Text>
          <TouchableOpacity onPress={()=>OpenDetails(offer.id)}><Text>Szegóły</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.cardDetails}>{`${offer.distanceInKm.toFixed(1)} km`}</Text>
        <Text style={styles.cardDetails}>
          {offer.sugestedSalary} zł{offer.isSalaryPerHour ? `/h` : ``}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTop:{
    flex:1,
  },
  cardFooter: {
    bottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetails: {},
  close: {
    fontSize: 21,
  },
  title: {
    fontSize: 17,
    width: 220,
  },
  cardNavigationBar: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  underscore: {
    fontSize: 10,
  },
  cardTopRow: {
    flexDirection: "row",
  },
  detailView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderColor: "#c8c8c8",
    borderWidth: 3,
    padding: 10,
    borderRadius: 20,
    marginLeft: "8%",
    marginRight: "8%",
    bottom: 50,
    position: "absolute",
  },
  image: {
    width: "25%",
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  myMap: {
    flex: 2,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
