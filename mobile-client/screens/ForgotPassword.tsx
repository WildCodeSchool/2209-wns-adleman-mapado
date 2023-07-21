import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from "react-native";
import {City} from "../gql/generated/schema";
import MapView from 'react-native-maps';


export default function ForgotPassword({navigation}) {

    return (
        <TextInput
        placeholder="Nom d'utilisateur ou email"
        style={styles.info}
      />
    );
}

const styles = StyleSheet.create({
    info: {
        color: "white",
      },
});