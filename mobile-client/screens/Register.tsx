import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, TextInput, StatusBar, ScrollView, RefreshControl, Pressable, Alert, Button} from "react-native";
import Svg, { G, Rect } from "react-native-svg";
import { useState } from 'react';
import { useCreateUserMutation } from '../gql/generated/schema';
import * as ImagePicker from 'expo-image-picker';


export default function UserRegister({navigation}) {
    const [refresh, setRefresh] = useState(false);

    const pullRefresh = () => {
        setRefresh(true);
        setTimeout(() => {
          window;
          setRefresh(false);
        }, 2000);
      };

      const [image, setImage] = useState(null);

      const pickImage = async () => {
          // Demander les autorisations nécessaires
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Désolé, nous avons besoin des autorisations de la mémoire du téléphone pour que cela fonctionne!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log("le result =",result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setUserInfo({...userInfo, profilePicture: result.assets[0].uri});
        }else {
        console.log("le result =",result);

        }
      };


      const [userInfo, setUserInfo] = useState({email: "", password: "", userName:"", profilePicture: ""});
      const [CreateUser] = useCreateUserMutation();
      // console.log(userInfo)
    return (
        <View style={styles.container}>
              <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
        }
        style={styles.ScrollView}
      >
              <View style={styles.contain}>
            <TouchableHighlight
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.5,
            height: Dimensions.get("window").width * 0.5,
            borderWidth: 8,
            borderColor: "#F5DEB3",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            marginTop: 20,
          
          }}
          underlayColor="#CCC30A"
          onPress={() => alert("Mapado's Rule")}
        >
          <Text style={styles.mainName}>Mapado</Text>
        </TouchableHighlight>
        </View>
          <Text style={styles.welcome}>Bienvenue sur Mapado</Text>
          
              
          <TextInput
          placeholder="adresse e-mail"
          style={styles.info}
          value={userInfo.email}
          onChangeText={(val) =>
              setUserInfo({...userInfo, email: val})
          }
        />

        <Svg height="50" width="100%">
          <Rect x="0" y="10" width="1120" height="3" fill="white" />
        </Svg>

        <TextInput
          placeholder="Mot de passe"
          style={styles.info}
          value={userInfo.password}
          onChangeText={(val) =>
              setUserInfo({...userInfo, password: val})
          }
        />

        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.info}
          value={userInfo.userName}
          onChangeText={(val) =>
              setUserInfo({...userInfo, userName: val})
          }
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Choisir une photo" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
        
      
          

        <Svg height="50" width="100%">
          <Rect x="0" y="10" width="1120" height="3" fill="white" />
        </Svg>
        <Pressable
            style={styles.connexion}
            onPress={() => {
              CreateUser({variables: {data: userInfo}})
                  .then(() => {
                    navigation.navigate("home");
                    console.log("les info :",userInfo)
                      Alert.alert('Alert Title', 'My Alert Msg', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                  })
                  .catch((error) =>{
                    console.error(error); 
                  });
          }}
        >
          <Text style={styles.connexionText}>Créer son compte</Text>
        </Pressable>
        <StatusBar />
        
      </ScrollView>
    </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#08415C",
        alignItems: "center",
      },
    mainName: {
        color: "#F5DEB3",
        fontSize: 40,
      },
      contain: {
        flex: 1,
        alignItems: "center",
        },
        ScrollView: {
        },
      welcome: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
      },
      info: {
        color: "white",
      },
      connexion: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        paddingHorizontal: 32,
        height: 50,
        width: 200,
        borderRadius: 20,
        backgroundColor: "#F5DEB3",
        marginBottom: 70,
      },
      connexionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#08415C",
      },
});


