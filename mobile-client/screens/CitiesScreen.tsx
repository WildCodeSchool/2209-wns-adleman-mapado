import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground,
} from "react-native";
import { useCitiesQuery } from "../gql/generated/schema";
import CityListItem from "../components/CityListItem";
import React from "react";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function CitiesScreen({ navigation }) {
    const [text, onChangeText] = React.useState("");
    const { data } = useCitiesQuery();
    const cities = data?.cities || [];
    const image = require("../assets/images/background-blue.jpg");

    // filtre les villes en fonction de la recherche
    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
            >
                <StatusBar />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={"Recherchez une ville"}
                ></TextInput>

                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.id.toString()}
                    data={filteredCities}
                    renderItem={({ item }) => {
                        console.log("Ville :", item);

                        return (
                            <CityListItem navigation={navigation} city={item} />
                        );
                    }}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3270F4",

        paddingBottom: 10,
    },
    mapadoTitle: {
        color: "white",
        fontSize: 25,
        marginTop: 10,
        paddingBottom: 10,
    },
    user: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    input: {
        backgroundColor: "white",
        width: 220,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    list: {
        width: "60%",
        marginLeft: "20%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});
