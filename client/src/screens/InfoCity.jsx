import Map from "../screens/Map";
import {useParams} from "react-router-dom";
import {useGetCityQuery} from "../gql/generated/schema";

export default function InfoCity() {
    const {cityName} = useParams();

    console.log(cityName)

    const {loading: loadingCities, data} = useGetCityQuery({variables: {query: cityName}})

    const city = data?.city ?? [];

    return (
        <div>
            <Map longitude={city.longitude} latitude={city.latitude}></Map>
        </div>
    )
}
;
