import {MouseEventHandler, useEffect, useState} from "react";
import {
  useGetCityQuery,
  useUpdateCityMutation,
  useDeletePoiMutation,
  useGetProfileQuery,
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import IPoi from "../interfaces/IPoi";
import Rocket from "../assets/images/rocket.gif";
import BadgeEdit from "../components/BadgeEdit";
import { resetCaches } from "@apollo/client";

export default function EditCity() {
    //
    // STATES
    //
    const [animeRocket, setAnimeRocket] = useState(false);

    //
    // Navigation
    //
    const {cityName} = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    //
    // USE EFFECT
    //
    useEffect(() => {
        // document.body.style.overflowY = "scroll";
        const timer = setTimeout(() => {
            setAnimeRocket(true);
        }, 500);
        return () => clearTimeout(timer);
    });

    // Initialisation de l'objet city à mettre à jout
    const [cityDataToUpdate, setCityDataToUpdate] = useState({
        name: "",
        photo: "",
    });

    //
    // MUTATIONS GRAPHQL
    //

    const { data: currentUser } = useGetProfileQuery();
    const currentUserRole = currentUser?.profile?.role;
    
    const [updateCity] = useUpdateCityMutation({onCompleted: () => refetch()});
    const [deletePoi] = useDeletePoiMutation({onCompleted: () => refetch()});
    const {data, refetch} = useGetCityQuery({
        variables: {query: cityName!},
    });

    if (data) {
        console.log("Voici la ville :", data);
    }
    const city: ICity = {
        id: data?.city.id!,
        name: data?.city.name!,
        photo: data?.city.photo!,
        pois: [],
    };

    data?.city?.poi?.forEach((p) => {
        const poi: IPoi = {
            id: p.id,
            name: p.name,
            longitude: p.longitude!,
            latitude: p.latitude!,
            address: p.address,
            category: p.category?.name,
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

    const handleSubmit = () => {
        if (cityDataToUpdate.name !== "" && cityDataToUpdate.photo !== "") {
            updateCity({
                variables: {
                    updateCityId: city.id,
                    data: cityDataToUpdate,
                },
            });
        } else if (cityDataToUpdate.name !== "" && cityDataToUpdate.photo === "") {
            updateCity({
                variables: {
                    updateCityId: city.id,
                    data: {name: cityDataToUpdate.name},
                },
            });
        } else if (cityDataToUpdate.name === "" && cityDataToUpdate.photo !== "") {
            updateCity({
                variables: {
                    updateCityId: city.id,
                    data: {photo: cityDataToUpdate.photo},
                },
            });
        }
    };

    return (
        <Card customClass={" editCity_container"}>
            <Link to={`/info/${city.name}`} className="cityInfo_link">
                <h1 className="cityLabel">{"Aller sur la map de " + city.name}</h1>
                <img
                    className={`rocket${animeRocket ? " rocket--animated" : ""}`}
                    src={Rocket}
                    alt="rocket"
                />
            </Link>
            <button className={"backButton"} onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                </svg>
            </button>
            <div className={"addPoi_InputsContainer editCity_container"}>
                <h2 className={"title editCity_title"}>Ajouter un point d'intérêt</h2>
                <AddPoi cityId={city.id} cityName={city.name}></AddPoi>
            </div>
            <div className={"editCity_InputsContainer editCity_container"}>
                <h2 className={"title editCity_title"}>Modifier la ville</h2>
                <form onSubmit={handleSubmit} className={"editCity_form"}>
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
                        <label id={"photo"}>Photo</label>
                        <input
                            type="text"
                            placeholder={
                                city.photo?.toString() || "copier le lien de la photo"
                            }
                            value={cityDataToUpdate.photo}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    photo: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <button type="submit" className={"tertiaryButton"}>
                        Modifier {city.name}
                    </button>
                </form>
            </div>
            <div className="poi_list">
                {city.pois?.length ? (
                    <>
                        <h2 className={"title editCity_title"}>Liste des points d'intérêt</h2>
                        {city.pois.map((poi, index: number) => (
                            <BadgeEdit
                                contentA={poi.name}
                                contentB={poi.category}
                                key={index}
                                categoryId={poi.id}
                                functionOnClick={onClickDeletePoi}
                            />
                        ))}
                    </>
                ) : null}
            </div>
        </Card>
    );

}
