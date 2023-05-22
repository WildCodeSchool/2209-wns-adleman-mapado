import { useState } from "react";
import {
  useFetchPoiCoordinatesMutation,
} from "../gql/generated/schema";

interface PoiProps {
  cityId: number;
  cityName: string;
}

export default function AddPoi({ cityId, cityName }: PoiProps) {
  // Initialisation de l'objet poiRequested
  const [poiRequested, setPoiRequested] = useState({
    poiNameOrAdress: "",
    cityId: 0,
    cityName: "",
  });

  const [sendPoiNameOrAdress] = useFetchPoiCoordinatesMutation();

  const onClickSendNewPoi = () => {
    sendPoiNameOrAdress({ variables: { data: poiRequested } });
    console.log("data envoyée au back", poiRequested);
  };


  return (
    <>
      <input
        type="text"
        placeholder="Nom ou Adresse du POI"
        value={poiRequested.poiNameOrAdress}
        onChange={(e) =>
          setPoiRequested((prevState) => ({
            ...prevState,
            poiNameOrAdress: e.target.value,
            cityId: cityId,
            cityName: cityName,
          }))
        }
      ></input>
      <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
        Ajouter
      </button>
    </>
  );
}
