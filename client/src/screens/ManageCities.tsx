import { useState } from "react";
import {useCitiesQuery, useFetchCityNameMutation } from "../gql/generated/schema";
import Card from "../components/Card";

interface City {
  id: number;
  name: string;
  // latitude?: number;
  // longitude?: number;
  // photo?: string;
  // users?: User[];
  // poi?: Poi[];
}

export default function AddManageCities() {
    const { data, refetch } = useCitiesQuery();
    const cities = data?.cities ?? [];

  // Initialisation de l'objet cityRequested
  const [cityRequested, setCityRequested] = useState({
    cityName: "",
  });

  // fonction gql qui récupère la valeur de l'input
  const [sendCityName] = useFetchCityNameMutation();

  // Au click du bouton on lance la fonction gql
  const onClickSendCityName = () => {
    console.log(cityRequested);
    sendCityName({ variables: { data: cityRequested } }).then(() => refetch());
  };

  return (
    <Card customClass={"registerCard"}>
      <h2 className={"title"}>Ajouter une ville</h2>

      <div className={"addCityContainer"}>
        <input
          type="text"
          placeholder="Nom de la ville"
          value={cityRequested.cityName}
          onChange={(e) => setCityRequested({ cityName: e.target.value })}
        ></input>
        <button onClick={onClickSendCityName} className={"tertiaryButton"}>
          Ajouter
        </button>
      </div>

      <div className={"manageCitiesContainer"}>
        <h2 className={"title"}>Gérer les villes</h2>
        {cities.map((city: City) => {
          return (
            <div key={city.id} className={"manageOneCityContainer"}>
              <p className={"cityLabel"} data-testid="city-list">{city.name}</p>
              <button className={"primaryButton"}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
