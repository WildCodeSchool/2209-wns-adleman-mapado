import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, TextInput, View, Text} from 'react-native';
import {useCitiesQuery} from "../gql/generated/schema";
import CityListItem from "../components/CityListItem";
import React from "react";


export default function CitiesScreen({navigation}) {
    const [text, onChangeText] = React.useState('');

    const {data} = useCitiesQuery();
    const cities = data?.cities || [];

    return (
        <View style={styles.container}>
            <StatusBar/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Recherchez un ville"}>
            </TextInput>
            <Text>Home</Text>

            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={cities}
                renderItem={({item}) => <CityListItem navigation={navigation} city={item}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3270F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    mapadoTitle: {
        color: 'white',
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
    }
});