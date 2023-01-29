import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {City} from "../gql/generated/schema";
import Ionicons from "@expo/vector-icons/Ionicons";
interface WilderListItemProps {
    city: City;
}

export default function CityListItem({ city, navigation }: WilderListItemProps) {

    return (
        <View style={styles.listItem}>
            <TouchableOpacity style={styles.buttonItem} onPress={()=>navigation.navigate('Info', city)}>
                <View>
                    {city.image ? (
                        <Image source={{ uri: city.image }} />
                    ) : (
                        <Ionicons name={"home-outline"} size={40} />
                    )}
                </View>
                <Text style={styles.listItemText}>{city.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center"
    },
    listItemText: {
        fontSize: 25,
    },
    buttonItem:{
        padding: 20,
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10
    }
});