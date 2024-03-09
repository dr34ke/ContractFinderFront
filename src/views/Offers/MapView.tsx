import React from "react";
import {
  Button,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export default function Map() {
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
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({...location, latitude:loc.coords.latitude, longitude:loc.coords.longitude});
  };

  return (
    <View style={styles.container}>
      <View style={styles.myMap}>
        <MapView
          region={location}
          style={styles.map}
          showsUserLocation
          mapType={Platform.OS == "ios" ? "none" : "standard"}
        ></MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
