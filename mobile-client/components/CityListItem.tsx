import { View, Text, StyleSheet, Image } from "react-native";
import {City} from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";
interface WilderListItemProps {
    city: City;
}

export default function CityListItem({ city }: WilderListItemProps) {
    return (
        <View style={styles.listItem}>
            <View style={styles.avatarContainer}>
                {city.image ? (
                    <Image source={{ uri: city.image }} />
                ) : (
                    <Ionicons name={"person-circle-sharp"} size={40} />
                )}
            </View>
            <Text style={styles.listItemText}>{city.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        flex: 1,
        flexDirection: "row",
        width: "100%"
    },
    listItemText: {
        fontSize: 25,
    },
    avatarContainer: {
        marginRight: 20,
    },
});