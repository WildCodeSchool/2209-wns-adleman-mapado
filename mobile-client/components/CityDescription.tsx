import { StyleSheet, View, Text } from "react-native";
import React from "react";

interface CityDescriptionProps {
    cityName: string;
    description: string;
}

const CityDescription = ({ cityName, description }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                    marginBottom: 10,
                }}
            />
            <Text style={styles.cityName}>{cityName}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "black",
    },
    topLine: {
        height: 1,
        backgroundColor: "white",
    },
    cityName: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FADF63",
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 12,
        padding: 10,
        color: "white",
        textAlign: "center", // Centrer le texte
    },
});

export default CityDescription;
