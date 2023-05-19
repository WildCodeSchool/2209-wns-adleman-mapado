import {useEffect, useState} from "react";
import {
    useCitiesQuery,
    useFetchCityNameMutation,
    useDeleteCityMutation,
    useCreateUserMutation,
    useFetchPoiCoordinatesMutation,
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";

export default function AddManageCities() {
    //
    // STATES
    //

    useEffect(() => {
        document.body.style.overflow = "scroll"
    })

    // Initialisation de l'objet cityRequested
    const [cityRequested, setCityRequested] = useState({
        cityName: "",
    });

    //
    // MUTATIONS GRAPHQL
    //

    // fonction gql qui récupère la valeur de l'input
    //REFETCH POSSIBLE ICI
    const [sendCityName] = useFetchCityNameMutation();
    const [deleteCity] = useDeleteCityMutation();
    const {loading: loadingCities, data, refetch} = useCitiesQuery();
    const cities = data?.cities ?? [];

    //
    // FONCTIONS ONCLICK
    //

    // Au click du bouton on lance la fonction gql
    const onClickSendCityName = () => {
        sendCityName({variables: {data: cityRequested}});
    };

    const onClickDeleteCity = (cityId: number) => {
        deleteCity({variables: {deleteCityId: cityId}});
    };


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
                        {cities.map((city: ICity, index: number) => {
                            return (
                                <div key={index} className="py-5">
                                    <details className="group">
                                        <summary
                                            className="flex justify-between items-center font-medium cursor-pointer list-none">
                                            <div className={"manageOneCityContainer"}>
                                                <p className={"cityLabel"}>{city.name}</p>
                                                <button
                                                    className={"primaryButton"}
                                                    onClick={(e) => onClickDeleteCity(city.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                            <span className="transition group-open:rotate-180">
                        <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                                        </summary>
                                        <h2 className={"title"}>Ajouter un point d'intérêt</h2>
                                        <AddPoi cityId={city.id} cityName={city.name}></AddPoi>
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
