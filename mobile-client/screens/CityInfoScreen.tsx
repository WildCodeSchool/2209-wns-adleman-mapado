import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import {City} from "../gql/generated/schema";
import MapView from 'react-native-maps';



interface WilderListItemProps {
    city: City;
    route: any;
}

export default function CityInfoScreen({route}: WilderListItemProps) {
    const {
        name,
        photo
    } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{uri: photo}} style={styles.cityImage}/>
            <Text style={styles.cityTitle}>{name}</Text>
            <Text style={{padding: 20}}>Bordeaux, au cœur de la région viticole, est une ville portuaire située sur la Garonne, dans le
                sud-ouest de la France. Elle est réputée pour la cathédrale gothique de Saint-André, ses manoirs
                construits aux XVIIIe et XIXe siècles, ainsi que ses musées d'art comme le musée des Beaux-Arts de
                Bordeaux. Les jardins publics suivent les courbes des quais qui longent le fleuve. La place de la
                Bourse, au centre de laquelle trône la fontaine des Trois Grâces, se reflète dans le miroir
                d'eau.
            </Text>
            <MapView
                style={styles.cityMap}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white"
    },
    cityTitle: {
        fontSize: 25,
        color: "#EC5D5B",
        paddingTop: 20,
    },
    avatarContainer: {
        marginRight: 20,
    },
    cityImage: {
        width: "100%",
        height: 200,
    },
    cityMap:{
        flex: 1,
        width: '100%',
        height: '100%',
    }
});