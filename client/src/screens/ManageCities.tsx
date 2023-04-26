import { useState } from "react";
import { useFetchCityNameMutation } from "../gql/generated/schema";
import Card from "../components/Card";
import { useQuery } from "react-apollo";
import { gql } from '@apollo/client';
import { useCitiesQuery } from "../gql/generated/schema";


interface City {
  id: number;
  name: string;
  // latitude?: number;
  // longitude?: number;
  // photo?: string;
  // users?: User[];
  // poi?: Poi[];
}

interface Cities {
  cities: City[];
}



export default function AddManageCities({ cities }: Cities) {
  // Initialisation de l'objet cityRequested
  const [cityRequested, setCityRequested] = useState({
    cityName: "",
  });
  

  const {refetch} = useCitiesQuery()
  

  // fonction gql qui récupère la valeur de l'input
  const [sendCityName] = useFetchCityNameMutation();

  // Au click du bouton on lance la fonction gql
  const onClickSendCityName = () => {
    console.log(cityRequested);
    console.log(typeof cityRequested);
    sendCityName({ variables: { data: cityRequested } })
      .then((res) => {
      refetch();
      })
      .catch((err) => {
        console.error(err);
      });

    };



    const onClickDeleteCity = () => { 
      console.log('yalalalalala')
    }
    

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
            <div className={"manageOneCityContainer"} key={city.id}>
              <p className={"cityLabel"}>{city.name}</p>
              <button className={"primaryButton"}
              onClick={onClickDeleteCity}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}


