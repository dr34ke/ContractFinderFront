import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import OwnButton from "../../components/ownButton";

export type PickLocationStackParamList = {
  PickLocation: { onSelectLocation: (la: number, lo:number) => void };
  AddNewForm:{}
};

export type PickLocationScreenNavigationProp = NativeStackNavigationProp<
  PickLocationStackParamList,
  "PickLocation"
>;

type Props = {
  route: PickLocationScreenRouteProp;
  navigation: PickLocationScreenNavigationProp;
};

type PickLocationScreenRouteProp = RouteProp<
  PickLocationStackParamList,
  "PickLocation"
>;

export function PickLocation({ route, navigation }: Props) {
  const [region, setRegion] = useState<Region | undefined>(undefined);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const handleLocationSelect = () => {
    route.params.onSelectLocation(region?.latitude??0, region?.longitude??0);
    navigation.goBack();
  };

  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
      />
      <View style={styles.markerFixed}>
        <Image
          style={styles.marker}
          source={require("../../../assets/icons8-marker.png")}
        />
      </View>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
        <OwnButton title={"Wybierz"} onPress={handleLocationSelect} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20,
  },
});
