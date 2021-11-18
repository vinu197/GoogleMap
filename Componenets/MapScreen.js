import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View , PermissionsAndroid,} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import CustomButton from './CustomButton'
import AsyncStorage from "@react-native-community/async-storage";
export default function MapScreen({navigation}) {
  
const [position, setPosition] = useState({
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
  });

useEffect(() => {
  Geolocation.getCurrentPosition((pos) => {
  const crd = pos.coords;
  setPosition({
  latitude: crd.latitude,
  longitude: crd.longitude,
  latitudeDelta: 0.0421,
  longitudeDelta: 0.0421,
 });
    }).catch((err) => {
        console.log(err);
        });
      }, []);
    const setData=()=>{
      navigation.navigate('Home');
      }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={position}
        showsUserLocation={true}
      > 
    <Marker coordinate={position} />
      </MapView>
      <CustomButton
      title='Map'
      color='#0080ff'
      onPressFunction={setData}/>

    <Text style={styles.text}>Current latitude: {position.latitude}</Text>
    <Text style={styles.text}>Current longitude: {position.longitude}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height:700
  },
});