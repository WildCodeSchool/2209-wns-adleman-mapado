import Map from "../components/Map";
import {useParams} from "react-router-dom";
import {useGetCityQuery} from "../gql/generated/schema";
import {Marker, Popup} from "react-leaflet";
import markerIconPng from "../assets/images/starred.png";
import leftArrow from "../assets/images/left-arrow.svg"
import {Icon} from "leaflet";
import ICity from "../interfaces/ICity";
import IPoi from "../interfaces/IPoi";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function InfoCity() {
    const {cityName} = useParams();

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const {loading: loadingCities, data} = useGetCityQuery({
        variables: {query: cityName!},
    });
    console.log("Log de la data BACK", data?.city);

    const city: ICity = {
        id: data?.city.id!,
        name: data?.city.name!,
        longitude: data?.city.longitude,
        latitude: data?.city.latitude,
        pois: [],
    };

    data?.city?.poi?.forEach((e) => {
        const poi: IPoi = {
            id: e.id,
            name: e.name,
            longitude: e.longitude!,
            latitude: e.latitude!,
            address: e.address,
        };
        city?.pois?.push(poi);
    });

    useEffect(() => {
        document.body.style.overflow = "auto"
    })

    console.log("Log de l'objet FRONT", city);

    //   const city: ICity = data?.city ? data?.city : null;
    //   const pois = city.poi;

    return (
        <div>
            <button className={"backButton"} onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                </svg>
            </button>
            <Map longitude={city.longitude} latitude={city.latitude}>
                {city.pois
                    ? city.pois.map((e: IPoi, index: number) => (
                        <Marker
                            key={index}
                            riseOnHover={true}
                            position={[e.latitude!, e.longitude!]}
                            icon={
                                new Icon({
                                    iconUrl: markerIconPng,
                                    iconSize: [25, 25],
                                    iconAnchor: [13, 28],
                                })
                            }
                        >
                            <Popup>
                                {e.name}
                                <br/> {e.address}.
                            </Popup>
                        </Marker>
                    ))
                    : null}
            </Map>
        </div>
    );
}
