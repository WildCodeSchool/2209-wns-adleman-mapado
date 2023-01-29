import client from "./gql/client"
import {ApolloProvider} from "@apollo/client";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import CitiesScreen from "./screens/CitiesScreen";
import CityInfoScreen from "./screens/CityInfoScreen";
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Cities() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={CitiesScreen} />
            <Stack.Screen name="Info" component={CityInfoScreen} />
        </Stack.Navigator>
    )
}
export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={ ({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            if (route.name === "Login") {
                                return (
                                    <Ionicons
                                        name={focused ? "person-circle" : "person-circle-outline"}
                                        size={size}
                                        color={color}
                                    />
                                );
                            } else if (route.name === "Cities") {
                                return (
                                    <Ionicons
                                        name={focused ? "airplane" : "airplane-outline"}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            return (
                                <Ionicons name={"alert-circle"} size={size} color={color}/>
                            );
                        },
                        tabBarActiveTintColor: "#f76c6c",
                        tabBarInactiveTintColor: "gray",
                        tabBarStyle: {height: 60, paddingBottom: 10},
                    })}
                >
                    <Tab.Screen name="Cities" component={Cities}/>
                    <Tab.Screen name="Login" component={CitiesScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
