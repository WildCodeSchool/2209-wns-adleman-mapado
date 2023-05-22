import Map from "../components/Map";
import { useParams } from "react-router-dom";
import { useGetCityQuery, useGetProfileQuery } from "../gql/generated/schema";
import { Marker, Popup } from "react-leaflet";
import markerIconPng from "../assets/images/starred.png";
import { Icon } from "leaflet";
import ICity from "../interfaces/ICity";
import IPoi from "../interfaces/IPoi";
import AddPoi from "../components/AddPoi";

export default function InfoCity() {
  const { cityName } = useParams();

  const { loading: loadingCities, data } = useGetCityQuery({
    variables: { query: cityName! },
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

  console.log("Log de l'objet FRONT", city);

  //   const city: ICity = data?.city ? data?.city : null;
  //   const pois = city.poi;

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const currentUserRole = currentUser?.profile?.role;
  console.log(currentUserRole);

  return (
    <div className="flex flex-col items-center">
      {(currentUserRole === "superAdmin" ||
        currentUserRole === "cityAdmin" ||
        currentUserRole === "POICreator") && (
        <div className={"flex items-center addPoi-container"}>
          <span className={"text"}>Ajouter un point d'intérêt : </span>{" "}
          <AddPoi cityId={city.id} cityName={city.name} />
        </div>
      )}

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
                  <br /> {e.address}.
                </Popup>
              </Marker>
            ))
          : null}
      </Map>
    </div>
  );
}
