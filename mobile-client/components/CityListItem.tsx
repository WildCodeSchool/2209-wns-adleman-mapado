import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { City } from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";

interface WilderListItemProps {
    city: City;
    navigation: any;
}

export default function CityListItem({
    city,
    navigation,
}: WilderListItemProps) {
    return (
        <View style={styles.listItem}>
            <View>
                {city.photo ? (
                    <Image
                        source={{ uri: city.photo }}
                        style={{ width: 200, height: 200 }}
                    />
                ) : (
                    <Ionicons name={"home-outline"} size={40} />
                )}
            </View>
            <Text style={styles.listItemText}>{city.name}</Text>
            <TouchableOpacity
                style={styles.buttonItem}
                onPress={() => navigation.navigate("Info", city)}
            >
                <Text style={styles.buttonText}>Voir la ville</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "white",
        padding: 20,
        flex: 1,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        marginBottom: 30,
        borderRadius: 25,
        borderBottomRightRadius: 0,
    },
    listItemText: {
        fontSize: 25,
        color: "#EC5D5B",
    },
    buttonItem: {
        padding: 15,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderColor: "#EC5D5B",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#EC5D5B",
    },
});
