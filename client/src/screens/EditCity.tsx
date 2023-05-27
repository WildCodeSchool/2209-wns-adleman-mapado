import {MouseEventHandler, useEffect, useState} from "react";
import {
    useFetchCityNameMutation,
    useGetCityQuery,
    useUpdateCityMutation,
    useDeletePoiMutation
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import IPoi from "../interfaces/IPoi";
import Rocket from "../assets/images/rocket.gif"
import BadgeEdit from "../components/BadgeEdit";

export default function EditCity() {
    //
    // STATES
    //
    const [animeRocket, setAnimeRocket] = useState(false)

    //
    // Navigation
    //
    const {cityName} = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    //
    // USE EFFECT
    //
    useEffect(() => {
        // document.body.style.overflowY = "scroll";
        const timer = setTimeout(() => {
            setAnimeRocket(true)
        }, 500);
        return () => clearTimeout(timer);
    })

    // Initialisation de l'objet city à mettre à jout
    const [cityDataToUpdate, setCityDataToUpdate] = useState({
        name: "",
        longitude: "",
        latitude: "",
        photo: "",
        pois: []
    });

    //
    // MUTATIONS GRAPHQL
    //
    const [sendCityName] = useFetchCityNameMutation();
    const [updateCity] = useUpdateCityMutation()
    const [deletePoi] = useDeletePoiMutation({onCompleted: () => refetch()})
    const {loading, data, refetch} = useGetCityQuery({
        variables: {query: cityName!},
    });
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

    //
    // FONCTIONS ONCLICK
    //
    const onClickDeletePoi: MouseEventHandler<HTMLButtonElement> = (event) => {
        const poiId = event.currentTarget.getAttribute("data-id");
        if (poiId) {
            deletePoi({variables: {deletePoiId: parseInt(poiId)}});
        }
    };

    return (
        <Card customClass={" editCity_container"}>
            <Link to={`/info/${city.name}`} className="cityInfo_link">
                <h1 className="cityLabel">{city.name}</h1>
                <img className={`rocket${animeRocket ? " rocket--animated" : ""}`} src={Rocket} alt="rocket"/>
            </Link>
            <button className={"backButton"} onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                </svg>
            </button>
            <div className={"addPoi_InputsContainer"}>
                <h2 className={"title"}>Ajouter un point d'intérêt</h2>
                <AddPoi cityId={city.id} cityName={city.name}></AddPoi>
            </div>
            <div className={"editCity_InputsContainer"}>
                <h2 className={"title"}>Modifier la ville</h2>
                <form className={"editCity_form"}>
                    <div className={"editCity_form_inputContainer"}>
                        <label id={"name"}>Nom</label>
                        <input
                            type="text"
                            placeholder={city.name}
                            value={cityDataToUpdate.name}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className={"editCity_form_inputContainer"}>
                        <label id={"name"}>Photo</label>
                        <input
                            type="text"
                            placeholder={city.photo?.toString() || "copier le lien de la photo"}
                            value={cityDataToUpdate.photo}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    photo: e.target.value,
                                }))
                            }/>
                    </div>
                    {city.pois?.length ? (<>
                            <label id={"name"}>Points d'intérêt</label>
                            {city.pois.map((poi, index: number) => (
                                <BadgeEdit text={poi.name} key={index} categoryId={poi.id}
                                           functionOnClick={onClickDeletePoi}/>
                            ))}
                        </>)
                        : null
                    }
                </form>
            </div>
        </Card>
    );
}
