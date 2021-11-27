import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView,FlatList } from "react-native";
import MapView from "react-native-maps";
import SQLite from 'react-native-sqlite-storage';
import {COLORS,FONTS } from '../Constants/theme'
import Geolocation from '@react-native-community/geolocation';
import { Marker } from "react-native-maps";



const db = SQLite.openDatabase(
    {
        name: 'MapDb',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

const Dashboard = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Location',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setItems(temp);

                    if (results.rows.length >= 1) {
                        setEmpty(false);
                    } else {
                        setEmpty(true)
                    }

                }
            );

        });
    }, []);

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
                    "INSERT INTO Location (latitude, longitude ) VALUES (?,?)",
                    [position.latitude, position.longitude]
                );
            })
          

        } catch (error) {
            console.log(error);
        }


    }
    
    const listViewItemSeparator = () => {
        return (
            <View
                style={styles.listviewStyle}
            />
        );
    };

    const emptyMSG = (status) => {
        return (
            <View style={styles.emptyMSGviewStyle}>

                <Text style={styles.emptyMSGtextStyle}>
                    No Record Inserted Database is Empty...
                </Text>

            </View>
        );
    }

    return (
        <SafeAreaView style={styles.maincontainerStyle}>
            <View style={styles.maincontainerStyle}>
                <Text style={styles.textmylocation}>
                    My Location
                </Text>
                <Text style={styles.textlocation}>
                   Location will update after Every 30 minutes
                </Text>


        <View style={{ padding: 20,flex: 1}}>

            <MapView
                style={styles.map}
                initialRegion={position}
                showsUserLocation={true}>
                <Marker coordinate={position} />

{items.map((val, index) => {
  return (<MapView.Marker
          coordinate={{
          latitude: val.latitude,
          longitude: val.longitude
          }}
          key={index}
          
         />); 
 })}
  </MapView>
            
    <Text style={styles.itemsStyle}> latitude: {position.latitude} </Text>
    <Text style={styles.itemsStyle}> longitude: {position.longitude} </Text>
        
</View>

</View>
</SafeAreaView>


    )
}
                


const styles = StyleSheet.create({
    listviewStyle:{
        height:1,
        width: '100%',
        backgroundColor: COLORS.black
    },
    
    emptyMSGviewStyle:{
        justifyContent: 'center',
         alignItems: 'center', 
         flex: 1
    },
    emptyMSGtextStyle:{
        ...FONTS.appFontSemiBold,
        textAlign: 'center' 
    },
    maincontainerStyle:{
        flex: 1
    },
    container:{
        flex: 1 
    },
    
    textmylocation:{
        ...FONTS.appFontSemiBold,
        textAlign: 'center', 
        color:COLORS.black, 
        padding: 10
    },
    textlocation:{
        ...FONTS.appFontSemiBold,
         textAlign: 'center',
        color: COLORS.black, 
        padding: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height:"100%"
    },
    
    
    });
    

export default Dashboard;


    