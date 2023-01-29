import {View, Text, StyleSheet, Image} from "react-native";
import {City} from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";

interface WilderListItemProps {
    city: City;
}

export default function CityInfoScreen({route}: WilderListItemProps) {
    const {
        name,
        image
    } = route.params;

    return (
        <View style={styles.listItem}>
            <Image source={{uri: image}} style={styles.cityImage}/>
            <Text style={styles.cityText}>{name}</Text>
            <Text>Bordeaux, au cœur de la région viticole, est une ville portuaire située sur la Garonne, dans le
                sud-ouest de la France. Elle est réputée pour la cathédrale gothique de Saint-André, ses manoirs
                construits aux XVIIIe et XIXe siècles, ainsi que ses musées d'art comme le musée des Beaux-Arts de
                Bordeaux. Les jardins publics suivent les courbes des quais qui longent le fleuve. La place de la
                Bourse, au centre de laquelle trône la fontaine des Trois Grâces, se reflète dans le miroir
                d'eau.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 0,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white"
    },
    cityText: {
        fontSize: 25,
        color: "#EC5D5B",
    },
    avatarContainer: {
        marginRight: 20,
    },
    cityImage: {
        width: "100%",
        height: 200,
    }
});