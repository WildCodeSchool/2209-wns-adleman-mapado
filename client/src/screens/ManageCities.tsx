import {useState} from "react";
import {
    useCitiesQuery,
    useFetchCityNameMutation,
    useDeleteCityMutation,
    useCreateUserMutation, 
    useCreatePoiMutation
} from "../gql/generated/schema";
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

interface Cities {
    cities: City[];
}

export default function AddManageCities() {

    // Initialisation de l'objet cityRequested
    const [cityRequested, setCityRequested] = useState({
        cityName: "",
    });
    const [newPoi, setNewPoi] = useState({
        name: "", address: "", cityId: 0
    });

    // fonction gql qui récupère la valeur de l'input
    //REFETCH POSSIBLE ICI
    const [sendCityName] = useFetchCityNameMutation();
    const {loading: loadingCities, data, refetch} = useCitiesQuery();
    const cities = data?.cities ?? [];

    const [deleteCity] = useDeleteCityMutation();
    const [createPoi] = useCreatePoiMutation()

    // Au click du bouton on lance la fonction gql
    const onClickSendCityName = () => {
        sendCityName({variables: {data: cityRequested}});
    };

    const onClickDeleteCity = (cityId: number) => {
        deleteCity({variables: {deleteCityId: cityId}});
    };

    const onClickSendNewPoi = () => {
        createPoi({variables: {data: newPoi}});
    };

    console.log(newPoi)

    return (
        <Card customClass={"registerCard"}>
            <h2 className={"title"}>Ajouter une ville</h2>
            <div className={"addCityContainer"}>
                <input
                    type="text"
                    placeholder="Nom de la ville"
                    value={cityRequested.cityName}
                    onChange={(e) => setCityRequested({cityName: e.target.value})}
                ></input>
                <button onClick={onClickSendCityName} className={"tertiaryButton"}>
                    Ajouter
                </button>
            </div>

            <div className={"manageCitiesContainer"}>
                <h2 className={"title"}>Gérer les villes</h2>
                <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
                    <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">

                        {cities.map((city: City) => {
                            return (

                                <div className="py-5">
                                    <details className="group">
                                        <summary
                                            className="flex justify-between items-center font-medium cursor-pointer list-none">
                                            <div className={"manageOneCityContainer"}>
                                                <p className={"cityLabel"}>{city.name}</p>
                                                <button className={"primaryButton"}
                                                        onClick={(e) => onClickDeleteCity(city.id)}>Supprimer
                                                </button>
                                            </div>
                                            <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                                         stroke="white"
                                                         strokeLinecap="round" strokeLinejoin="round"
                                                         strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                        </summary>
                                        <h2 className={"title"}>Ajouter un point d'intérêt</h2>
                                        <input
                                            type="text"
                                            placeholder="Nom du POI"
                                            value={newPoi.name}
                                            onChange={(e) => setNewPoi((prevState) => ({...prevState, name: e.target.value}))}
                                        ></input>
                                        <input
                                            type="text"
                                            placeholder="Adresse"
                                            value={newPoi.address}
                                            onChange={(e) => setNewPoi((prevState) => ({...prevState, address: e.target.value, cityId: city.id}))}
                                        ></input>
                                        <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
                                            Ajouter
                                        </button>
                                    </details>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}
