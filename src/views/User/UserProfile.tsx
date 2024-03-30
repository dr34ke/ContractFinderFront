import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import UsersProfileStore from "../../stores/usersProfile";
import { useIsFocused } from "@react-navigation/native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Get } from "../../api/apiService";
import { ScrollView } from "react-native-gesture-handler";

export default function UserProfileView() {
  const user = UsersProfileStore((u) => u.user);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const getRatings = async () => {
        const _userRatings = await Get<UserRating[]>(
          "/user/user-ratings/" + user.id,
          true
        );
        setUserRatings(_userRatings);
      };
      getRatings();
      setImage(`data:image/png;base64,${user?.image}`);
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={{ fontSize: 30 }}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={10} style={styles.description}>
            {user.description}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <StarRatingDisplay rating={user?.rating ?? 0} starSize={30} />
          <Text style={{ fontSize: 18 }}>{`${user.rating?.toFixed(2)}`}</Text>
        </View>
        {userRatings.map((item, key) => {
          return (
            <View key={key} style={styles.opinion}>
              <Text>{item.description}</Text>
              <StarRatingDisplay rating={item?.rating ?? 0} starSize={15} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    opinion:{
        paddingTop:5,
        paddingBottom:5,
        borderBottomWidth:1,
    },
  nameContainer: {
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    width: "60%",
    aspectRatio: "1/1",
    borderRadius: Dimensions.get("window").width * 0.5,
  },
  contentContainer: {
    padding: 10,
  },
  descriptionContainer: {},
  description: {},
});
