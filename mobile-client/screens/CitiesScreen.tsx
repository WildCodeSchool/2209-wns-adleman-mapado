import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useCitiesQuery} from "../gql/generated/schema";
import CityListItem from "../components/CityListItem";

export default function CitiesScreen() {
    const {loading, error, data} = useCitiesQuery();
    const cities = data?.cities || [];
    console.log(data)

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Text>Cities</Text>
            <FlatList
                keyExtractor={(item) => item.name}
                data={cities}
                renderItem={({ item }) => <CityListItem city={item}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
});
