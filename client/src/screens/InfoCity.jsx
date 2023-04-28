import Map from "../screens/Map";
import {useParams} from "react-router-dom";
import {useGetCityQuery} from "../gql/generated/schema";
import {Marker, Popup} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
export default function InfoCity() {
    const {cityName} = useParams();

    const {loading: loadingCities, data} = useGetCityQuery({variables: {query: cityName}})

    const city = data?.city ?? [];
    const pois = city.poi

    return (
        <div>
            <Map longitude={city.longitude} latitude={city.latitude}>
                {pois ? pois.map((e)=>
                    <Marker position={[e.latitude, e.longitude]}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                        <Popup>
                            {e.name}<br /> {e.address}.
                        </Popup>
                    </Marker>)
                    : null}
            </Map>
        </div>
    )
}
;
