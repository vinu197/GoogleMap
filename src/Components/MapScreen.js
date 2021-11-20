import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, PermissionsAndroid, Button, } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import SQLite from 'react-native-sqlite-storage';
import {COLORS,FONTS} from '../Constants/theme';

const db = SQLite.openDatabase(
    {
        name: 'MapDb',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);


export default function MapScreen({ navigation }) {
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [count,setCount]=useState(0);

    useEffect(() => {
        createTable();

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

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Location "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL);"
            )
        })
    }

    const setData = () => {
        setCount(count+1);
        if(count===1){
            getLocation();
            setInterval(() => getLocation(), 1800000)
            navigation.navigate('Home');
        }else{
            navigation.navigate('Home');
        }
        
        navigation.navigate('Home');
    }
    const getLocation = async () => {

        try {

            Geolocation.getCurrentPosition((pos) => {
                const crd = pos.coords;
                setPosition({
                    latitude: crd.latitude,
                    longitude: crd.longitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                });
            })
            await db.transaction(async (tx) => {

                await tx.executeSql(
                    "INSERT INTO Location (latitude, longitude) VALUES (?,?)",
                    [position.latitude, position.longitude]
                );
            })
          

        } catch (error) {
            console.log(error);
        }


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
            <Button
                title='Dashboard'
                color={COLORS.blue}
                onPress={setData} />

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
        height:"85%"
    },
});