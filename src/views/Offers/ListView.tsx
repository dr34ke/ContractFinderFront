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
import { Offer } from "../../models/Offer";
import useOffers from "../../stores/offersStore";
import UsersProfileStore from "../../stores/usersProfile";

export default function ListView() {
  const offers = useOffers((s) => s.offers);

  return (
    <ScrollView>
      {offers.map((offer) => {
        return <SingleRow offer={offer} key={offer.id} />;
      })}
    </ScrollView>
  );
}
interface Props {
  offer: Offer;
}
function SingleRow({ offer }: Props) {
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

  useEffect(() => {
    setImage(`data:image/png;base64,${user?.image}`);
  }, [user]);

  return (
    <TouchableOpacity style={styles.tile} key={offer.id} onPress={() => {}}>
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
