import React, { useState, useEffect } from "react";
import useOffers from "../../stores/offersStore";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import UsersProfileStore from "../../stores/usersProfile";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import OwnButton from "../../components/ownButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorOffersProps } from "./Offers";

function OfferView() {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();
  const offer = useOffers((s) => s.offer);

  const getUserProfile = UsersProfileStore((u) => u.getProfile);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfileDTO | undefined>(undefined);

  useEffect(() => {
    const download = async () => {
      const _user = await getUserProfile(offer?.userId ?? "");
      setUser(_user);
    };
    download();
  }, [offer]);

  useEffect(() => {
    setImage(`data:image/png;base64,${user?.image}`);
  }, [user]);

console.log(offer?.id)
  async function Apply(){
    navigation.navigate("Aplikuj");
}

  return (
    <ScrollView>
      <View style={styles.detailView}>
        <View>
          <View style={styles.cardTopRow}>
            <Image source={{ uri: image }} style={styles.image} />
            <View>
              <View style={styles.cardNavigationBar}>
                <Text style={styles.underscore}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <StarRatingDisplay rating={user?.rating ?? 0} starSize={15} />
              </View>
              <Text style={styles.title}>{offer?.title}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.description}>{offer?.description}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.underscore}>
            {offer?.onSite === true
              ? `${offer?.distanceInKm.toFixed(1)} km`
              : "Zdalnie"}
          </Text>
          <Text>
            {offer?.sugestedSalary} zł{offer?.isSalaryPerHour ? `/h` : ``}
          </Text>
        </View>
        <OwnButton onPress={Apply} title={"Aplikuj"} />
        <View>
          {offer?.usersApplications?.map((item, key) => {
            return <UserApplication application={item} key={key} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

interface Props {
  application: UserApplication;
}

function UserApplication({ application }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorOffersProps>>();
  const getUserProfile = UsersProfileStore((u) => u.getProfile);
  const setUserProfile = UsersProfileStore((u) => u.setUserProfile);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfileDTO | undefined>(undefined);

  useEffect(() => {
    const download = async () => {
      const _user = await getUserProfile(application.userId);
      setUser(_user);
    };
    download();
  }, [application]);

  useEffect(() => {
    setImage(`data:image/png;base64,${user?.image}`);
  }, [user]);

  const openUserProfile = async () => {
    setUserProfile(user?.id ?? "");
    navigation.navigate("Profil");
  };

  return (
    <View style={styles.applicationContainer}>
      <View style={styles.applicationUserInfoBar}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={openUserProfile}
        >
          <Image source={{ uri: image }} style={styles.applicationUserImage} />
          <Text style={styles.applicationUserName}>
            {user?.first_name} {user?.last_name}
          </Text>
        </TouchableOpacity>
        <View>
          <StarRatingDisplay rating={user?.rating ?? 0} starSize={15} />
        </View>
      </View>

      <Text>{application.description}</Text>
      <Text>{`${application.salaryOffer} zł`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  applicationUserName: {
    padding: 3,
  },
  applicationContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  applicationUserImage: {
    width: 35,
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
  applicationUserInfoBar: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 5,
  },

  description: {
    fontSize: 15,
  },
  image: {
    width: "25%",
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardDetails: {},
  close: {
    fontSize: 21,
  },
  title: {
    fontSize: 17,
    marginLeft: 3,
    width: "72%",
  },
  cardNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  underscore: {
    fontSize: 12,
    marginLeft: 3,
  },
  cardTopRow: {
    flexDirection: "row",
  },
  detailView: {
    flex: 1,
    padding: 5,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: "2%",
    paddingBottom: "7%",
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

export default OfferView;
