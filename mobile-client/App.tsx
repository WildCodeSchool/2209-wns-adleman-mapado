import client from "./gql/client"
import {ApolloProvider} from "@apollo/client";
import CitiesScreen from "./screens/CitiesScreen";

export default function App() {
    return (
        <ApolloProvider client={client}>
            <CitiesScreen />
        </ApolloProvider>
    );
}