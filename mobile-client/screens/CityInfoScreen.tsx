import { View, Text, StyleSheet, Image } from "react-native";
import {City} from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";
interface WilderListItemProps {
    city: City;
}

export default function CityInfoScreen({ route }: WilderListItemProps) {
    const {
        name,
        image
    } = route.params;

    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    listItemText: {
        fontSize: 25,
    },
    avatarContainer: {
        marginRight: 20,
    },
});