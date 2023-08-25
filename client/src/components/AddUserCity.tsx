import { useCitiesQuery } from "../gql/generated/schema";

export default function AddUserCity({
  handleOpenModal,
  onClickAssignCity,
  userCitiesList,
  selectedUser,
}: any) {
  const { data } = useCitiesQuery();

  const cities = data?.cities ?? [];

  console.log(userCitiesList)

  function handleOnClickAssignCity(
    cityId: number,
    cityName: string,
    selectedUserId: number,
    selectedUserEmail: string
  ) {
    onClickAssignCity(cityId, cityName, selectedUserId, selectedUserEmail);
  }

  return (
    <div className={"editUserCity_container"}>
      <ul className="select-userCities-container">
        <h2 className={"editUserCity_title"}>Assigner une nouvelle ville</h2>
        {cities.map((city) => {
          if (!userCitiesList?.includes(city.name))
            return (
              <li className="select-userCities-container" key={city.name}>
                <div className="select-userCity">
                  <option
                    className={"userCity-title"}
                    style={{ color: "#ec5d5c" }}
                    value={city.name}
                  >
                    {city.name}
                  </option>
                  <button
                    className="modal-select-button"
                    onClick={() =>
                      handleOnClickAssignCity(
                        city.id,
                        city.name,
                        selectedUser.id,
                        selectedUser.email
                      )
                    }
                  >
                    Select
                  </button>
                </div>
              </li>
            );
          
        })}
        <p className="title">
          Villes déjà assignées: {userCitiesList?.join(", ")}
        </p>
      </ul>
      <button className="modal-close-button" onClick={() => handleOpenModal()}>
        Close
      </button>
    </div>
  );
}
