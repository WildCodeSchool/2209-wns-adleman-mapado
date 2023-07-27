import Card from "../components/Card";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useGetProfileQuery } from "../gql/generated/schema";

export default function Admin() {
  const navigate = useNavigate();

  // Au click navigation à la page précédente
  const goBack = () => {
    navigate(-1);
  };

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const currentUserRole = currentUser?.profile?.role;

  return (
    <Card>
      <div className={"addCityContainer admin_wrapper"}>
        <button className={"backButton"} onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
          </svg>
        </button>
        <h1 className={"title"}>Admin</h1>
        {currentUserRole === "Super Administrator" && (
          <>
            <NavLink to={`/manage-cities`} className="country_link">
              Paramétrer les villes
            </NavLink>

            <NavLink to={`/manage-categories`} className="country_link">
              Paramétrer les catégories
            </NavLink>

          </>
        )}
        {(currentUserRole === "Super Administrator" ||
          currentUserRole === "City Administrator") && (
            <NavLink to={`/manage-users`} className="country_link">
              Paramétrer les utilisateurs
            </NavLink>

        )}

        {(currentUserRole === "Super Administrator" ||
            currentUserRole === "City Administrator" || currentUserRole === "POI Creator")   && (
            <NavLink to={`/manage-cities`} className="country_link">
              Paramétrer les villes
            </NavLink>

        )}
      </div>
    </Card>
  );
}
