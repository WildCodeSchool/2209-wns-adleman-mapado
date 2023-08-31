import { useEffect, useState } from "react";
import {
  useCitiesQuery,
  useDeleteCityMutation,
  useGetProfileQuery,
  useGetUserCitiesQuery,
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import Edit from "../assets/images/edit.gif";
import AddCity from "../components/AddCity";

export default function AddManageCities() {
  //
  // STATES
  //
  const navigate = useNavigate();
  const [removeAnimation, setRemoveAnimation] = useState(false);
  const handleAnimation = () => {
    if (window.scrollY >= 10) {
      setRemoveAnimation(true);
    }
  };

  window.addEventListener("scroll", handleAnimation);

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    const timer = setTimeout(() => {
      setRemoveAnimation(true);
    }, 5000);
    return () => clearTimeout(timer);
  });

  //
  // MUTATIONS GRAPHQL
  //

  // fonction gql qui récupère la valeur de l'input
  //REFETCH POSSIBLE ICI
  const [deleteCity] = useDeleteCityMutation();
  const { data } = useCitiesQuery();
  const cities = data?.cities ?? [];

  const { data: currentUser } = useGetProfileQuery();
  const currentUserRole = currentUser?.profile?.role;
  const currentUserId = currentUser?.profile.id;

  const { data: userCities, refetch: refetchUserCities } =
    useGetUserCitiesQuery({
      variables: { getUserCitiesId: currentUserId! },
      onCompleted: () => refetchUserCities(),
    });
  const userCitiesList = userCities?.getUserCities?.cities?.map(
    (city) => city.name
  );
  console.log(userCitiesList);

  //
  // FONCTIONS ONCLICK
  //

  // Au click navigation à la page précédente
  const goBack = () => {
    navigate(-1);
  };
  const goHome = () => {
    navigate("/");
  };

  const onClickDeleteCity = (cityId: number) => {
    deleteCity({ variables: { deleteCityId: cityId } });
    refetchUserCities();
  };

  return (
    <>
      {!currentUserRole && goHome()}
      {currentUserRole === "Super Administrator" ? (
        <div className={"addCityContainer"}>
          <button className={"backButton"} onClick={goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
              <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
            </svg>
          </button>
          <h2 className={"manageCities_title"}>Ajouter une ville</h2>
          <AddCity />
        </div>
      ) : (
        <div style={{ marginTop: "10rem" }}></div>
      )}
      <div className={"manageCitiesContainer"}>
        <h2 className={"manageCities_title"}>Gérer les villes</h2>
        <img
          src={Edit}
          alt="hand writting"
          className={`edit_animation${
            removeAnimation ? " edit_animation--removed" : ""
          }`}
        />
        <div className="max-w-screen-xl mx-auto px-5 min-h-screen w-full cities_card_container">
          {cities?.map((city: ICity, index: number) => {
            if (
              userCitiesList?.includes(city.name) ||
              currentUserRole === "Super Administrator"
            )
              return (
                <Card customClass={" manageCities-card"}>
                  <div
                    key={index}
                    className="py-5 divide-y divide-neutral-200 h-fit"
                  >
                    <p className={"cityLabel"}>{city.name}</p>
                    <div className="p-5 manageCities_buttonContainer">
                      {(currentUserRole === "Super Administrator" ||
                        currentUserRole === "City Administrator") && (
                        <button
                          className={"primaryButton"}
                          onClick={(e) => onClickDeleteCity(city.id)}
                        >
                          <DeleteForeverIcon />
                        </button>
                      )}
                      <Link to={`/edit-city/${city.name}`}>
                        <button className={"primaryButton"}>
                          <EditIcon />
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            return <></>;
          })}
        </div>
      </div>
    </>
  );
}
