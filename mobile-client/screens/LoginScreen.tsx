import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "Pierre@gmail.com",
    password: "Test@33000",
  });

  const [refresh, setRefresh] = useState(false);

  const pullRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      window;
      setRefresh(false);
    }, 2000);
  };
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  // récupère les données de l'utilisateur connecté afin de pouvoir afficher son nom dans le header
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  // instancie le message d'erreur si le mot de passe ou l'email est incorrect
  const [error, setError] = useState("");

  // instancie le message de validation si le mot de passe ou l'email est correct
  const [valid, setValid] = useState("");

  return (
    <View style={styles.container}>
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
          marginBottom: 60,
          marginTop: 20,
        }}
        underlayColor="#CCC30A"
        onPress={() => alert("Mapado's Rule")}
      >
        <Text style={styles.mainName}>Mapado</Text>
      </TouchableHighlight>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
        }
        style={styles.ScrollView}
      >
        <Text>Bienvenue sur Mapado</Text>
        {currentUser?.profile ? (
          <View>
            <Text>connected as {currentUser?.profile.email}</Text>
            <Button
              onPress={async () => {
                await logout();
                client.resetStore();
                SecureStore.setItemAsync("token", "");
              }}
              title="logout"
            />
          </View>
        ) : (
          <View>
            <TextInput
              onChangeText={(val) =>
                setCredentials({ ...credentials, email: val })
              }
              placeholder="Nom d'utilisateur ou email"
              value={credentials.email}
              style={styles.info}
            />

            <Svg height="15" width="100%">
              <Rect x="0" y="10" width="1120" height="3" fill="white" />
            </Svg>

            <TextInput
              onChangeText={(val) =>
                setCredentials({ ...credentials, password: val })
              }
              placeholder="Mot de passe"
              value={credentials.password}
              style={styles.info}
            />

            <Svg height="50" width="100%">
              <Rect x="0" y="10" width="1120" height="3" fill="white" />
            </Svg>

            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <View style={styles.contain}>
              <Pressable
                style={styles.connexion}
                onPress={() => {
                  login({ variables: { data: credentials } })
                    .then((res) => {
                      client.resetStore();
                      // navigation.navigate("Home");
                      if (res.data?.login) {
                        SecureStore.setItemAsync("token", res.data?.login);
                        console.log(currentUser?.profile);
                        console.log(client);
                        setCredentials;
                      }
                    })
                    .catch(() => setError("Mot de passe ou email incorrect"));
                }}
                // title="login"
              >
                <Text style={styles.connexionText}>Se connecter</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.contain}></View>

        <View style={styles.box}>
          <Pressable
            onPress={() => {
              navigation.navigate("Forgot");
              console.log("forgot");
            }}
          >
            <Text style={styles.Mdp}>Mot de passe oublié ?</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
              console.log("register");
            }}
          >
            <Text style={styles.text}>Créer un compte</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
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
  contain: {
    flex: 1,
    alignItems: "center",
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
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  Mdp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginRight: 60,
  },
  box: {
    flexDirection: "row",
  },
  mainName: {
    color: "#F5DEB3",
    fontSize: 40,
  },
  ScrollView: {},
});
