import { useState } from "react";
import { useFetchPoiCoordinatesMutation } from "../gql/generated/schema";

interface PoiProps {
  cityId: number;
  cityName: string;
  handleOpenModal?: () => void;
}

export default function AddPoi({ cityId, cityName, handleOpenModal }: PoiProps) {
  // Initialisation de l'objet poiRequested
  const [poiRequested, setPoiRequested] = useState({
    poiNameOrAdress: "",
    cityId: 0,
    cityName: "",
  });

  const [sendPoiNameOrAdress] = useFetchPoiCoordinatesMutation();

  const onClickSendNewPoi = () => {
    sendPoiNameOrAdress({ variables: { data: poiRequested } });
    //handleOpenModal()
    console.log("data envoyée au back", poiRequested);
  };


  return (
    <div className="poi_input">
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
      <div className="button-container">
      <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
        Ajouter
      </button>
      <button onClick={handleOpenModal} className={"secondaryButton"}>
        Fermer
      </button>
      </div>
    </div>
  );
}
