import Reac, { useState } from 'react';
import {
    FindPoi,
    useCategoriesQuery,
    useFetchPoiCoordinatesMutation,
    useGetCityQuery,
} from "../gql/generated/schema";
import { ApolloError } from "@apollo/client";
import checkIcon from "../assets/svg/check.svg";
import errorIcon from "../assets/svg/error.svg";
import Toast from "./Toast";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import PoiRequestedInterface from "./AddPoi"





/**
 * 
 * @returns Définition des intefaces
 */

interface ModalPoiProps {
    cityId: number;
    cityName: string;
}

interface PoiRequestedInterface {
    poiNameOrAdress: string;
    cityId: number;
    cityName: string;
    categoryId: number | null;
    description: string;
    rating: number | null;
    photo: string | undefined;
}

interface ToastInterface {
    id: number;
    title: string;
    description: string;
    icon: string;
    backgroundColor: string;
}












export default function ModalPoi({ cityId, cityName }: ModalPoiProps) {


    const [poiRequested, setPoiRequested] = useState<PoiRequestedInterface>({
        poiNameOrAdress: "",
        cityId: 0,
        cityName: "",
        categoryId: null,
        description: "",
        rating: null,
        photo: undefined
    });


    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
    const [sendPoiNameOrAddress] = useFetchPoiCoordinatesMutation();
    const { data } = useCategoriesQuery()
    const categories = data?.categories ?? [];


    const [toastData, setToastData] = useState<ToastInterface>({
        id: 0,
        title: "",
        description: "",
        icon: "",
        backgroundColor: "",
    });
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Envoyer les données du formulaire au backend ici
        // Réinitialiser les champs du formulaire après l'envoi
        setPoiRequested({
            poiNameOrAdress: "",
            cityId: cityId,
            cityName: cityName,
            categoryId: null,
            description: "",
            rating: null,
            photo: undefined
        });
        toggleModal(); // Fermer la modal après la soumission
    };

    const { refetch } = useGetCityQuery({
        variables: { query: cityName! },
    });
    const onClickSendNewPoi = () => {
        sendPoiNameOrAddress({ variables: { data: poiRequested as FindPoi } })
            .then((res) => {
                /* console.log("log du then", res); */

                setToastData({
                    id: Math.floor(Math.random() * 100 + 1),
                    description: res?.data?.fetchPoiCoordinates!,
                    title: "Super ! 👍",
                    backgroundColor: "green",
                    icon: checkIcon,
                });
                /*  console.log("log de toastData au click après le set", toastData); */
            })
            .catch((erreur: ApolloError) => {
                /* console.log(erreur); */
                setToastData({
                    id: Math.floor(Math.random() * 100 + 1),
                    description: erreur.message,
                    title: "Oups... 🧐",
                    backgroundColor: "#bd2424",
                    icon: errorIcon,
                });
            })
            .finally(() => {
                setShowToast(true);
                refetch();
            });
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="btn-modal">
                Ajouter un point d'intérêt
            </button>

            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <input
                                className='modal-input'
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
                            />
                            <input
                                className='modal-input'
                                type="text"
                                placeholder="Photo"
                                value={poiRequested.photo}
                                onChange={(e) =>
                                    setPoiRequested((prevState) => ({
                                        ...prevState,
                                        photo: e.target.value,
                                    }))
                                }
                            />

                            <label htmlFor="categories" className={"selectCategoryLabel"}>Catégorie</label>

                            <div className="add_category_container">
                                <select
                                    className="categorySelect"
                                    name="categories"
                                    id="categories"
                                    defaultValue=""
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setPoiRequested((prevState) => ({
                                            ...prevState,
                                            categoryId: parseInt(e.target.value, 10),
                                        }));
                                    }}
                                >
                                    <option value=""  className='modal-input'>Sélectionner la catégorie du POI</option>
                                    {categories ? categories.map((category, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    }) : null}
                                </select>
                                <Link className="create_category_link" to="/manage-categories">Créer une nouvelle catégorie</Link>
                            </div>

                            <div className="poi_description">
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    defaultValue=""
                                    onChange={(e) =>
                                        setPoiRequested((prevState) => ({
                                            ...prevState,
                                            description: e.target.value
                                        }))
                                    }
                                />
                            </div>
                            <Rating
                                name="half-rating"
                                defaultValue={0}
                                precision={0.5}
                                className="rating-stars"
                                onChange={(e) =>
                                    setPoiRequested((prevState) => ({
                                        ...prevState,
                                        rating: (parseInt((e.target as HTMLInputElement).value, 10))
                                    }))
                                }
                            />

                            <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
                                Ajouter
                            </button>
                            <Toast
                                toast={toastData}
                                position={"bottomRight"}
                                autoDelete={true}
                                autoDeleteTime={5000}
                                visible={showToast}
                                setVisible={setShowToast}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}