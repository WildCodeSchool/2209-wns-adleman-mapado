import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AddUserCity from "../components/AddUserCity";
import {
  useGetProfileQuery,
  useUpdateUserCitiesMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
  useGetUserCitiesQuery,
} from "../gql/generated/schema";

const SuperAdminRoles = [
  "Visitor",
  "POI Creator",
  "City Administrator",
  "Super Administrator",
];
const CityAdminRoles = ["Visitor", "POI Creator"];

export default function ManageUsers() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    role: "",
  });
  const [selectedUserForCity, setSelectedUserForCity] = useState({
    email: "",
    id: 0,
  });
  const [userId, setUserId] = useState<number>();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const { data: usersData, refetch: refetchUsers } = useUsersQuery({
    onCompleted: () => refetchUsers(),
  });

  const users = usersData?.users ?? [];

  const [updateUser] = useUpdateUserRoleMutation();

  const { data: currentUser } = useGetProfileQuery();
  const currentUserRole = currentUser?.profile?.role;
  const currentUserId = currentUser?.profile.id;

  const [updateCity] = useUpdateUserCitiesMutation();

  const { data: cities, refetch: refetchUserCities } = useGetUserCitiesQuery({
    variables: { getUserCitiesId: userId! },
    onCompleted: () => refetchUserCities(),
  });
  const userCitiesList = cities?.getUserCities?.cities?.map(
    (city) => city.name
  );

  async function handleSelectedUserForCity(
    selectedUserId: any,
    selectedUserEmail: any,
    newRole: any
  ) {
    await onClickRoleChange(selectedUserId, selectedUserEmail, newRole);
    setSelectedUserForCity(() => ({
      email: selectedUserEmail,
      id: selectedUserId,
    }));
    setUserId(() => selectedUserId);
    setOpenModal(true);
  }

  const onClickAssignCity = async (
    selectedCity: number,
    cityName: string,
    userId: number,
    userEmail: string
  ): Promise<any> => {
    try {
      await updateCity({
        variables: {
          cityId: selectedCity,
          userId: userId,
        },
      });
      await toast.success(
        `updated ${userEmail} has admin rights over ${cityName}`,
        {
          duration: 10000,
        }
      );
      refetchUsers();
      refetchUserCities();
      setOpenModal(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      toast.error(
        `Could not update city ${userEmail} rights on ${cityName}: ${error}`,
        {
          duration: 10000,
        }
      );
    }
  };

  const onClickRoleChange = async (
    id: number,
    email: string,
    role: string
  ): Promise<void> => {
    try {
      await setUserDetails(() => ({
        email,
        role,
      }));
      setUserId(() => id);
      updateUser({ variables: { data: { email, role } } });
      refetchUsers();
      toast.success(`Role mis à jour : ${email} est désormais ${role}`, {
        duration: 10000,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      toast.error(`Could not update role : ${error}`);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(() => !openModal);
  };

  useEffect(() => {
    refetchUsers();
  }, [userDetails, refetchUsers()]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ zIndex: 1 }}>
      <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
        <button className={"backButton"} onClick={goBack}>
          {" "}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
          </svg>
        </button>
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          <h1 className={"title"} style={{ marginTop: "20%" }}>
            Gérer les utilisateurs
          </h1>
          <h2 className={"editUser_title"} style={{ color: "white" }}>
            {" "}
            Vous êtes un {currentUserRole}
          </h2>
          {currentUserRole === "Super Administrator" &&
            users
              .filter((currentUser) => currentUser.id !== currentUserId)
              .map((user) => {
                return (
                  <div className="py-5" key={user.email}>
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <h2 className={"editUser_title"}>
                          {user.email} est actuellement un {user.role}
                        </h2>

                        <span
                          className="transition group-open:rotate-180"
                          onClick={() => setUserId(user.id)}
                        >
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
                      <h3 className={"editUser_title"}>
                        Villes: {userCitiesList?.join(", ")}
                      </h3>
                      {SuperAdminRoles.map((role, index) => {
                        return (
                          <div key={index} className={"editUser_container"}>
                            <option
                              className={
                                role === user.role
                                  ? "editUser_labelCurrent"
                                  : "editUser_label"
                              }
                              key={index}
                              value={role}
                            >
                              {role}
                            </option>
                            <div
                              className="modal-wrapper"
                              style={{ position: "relative" }}
                            >
                              <>
                                <button
                                  disabled={role === user.role ? true : false}
                                  className={
                                    role === user.role
                                      ? "primaryButtonDisabled"
                                      : "primaryButton"
                                  }
                                  onClick={() =>
                                    role === "POI Creator" ||
                                    role === "City Administrator"
                                      ? handleSelectedUserForCity(
                                          user.id,
                                          user.email,
                                          role
                                        )
                                      : onClickRoleChange(
                                          user.id,
                                          user.email!,
                                          role!
                                        )
                                  }
                                >
                                  Select
                                </button>
                                {openModal &&
                                  createPortal(
                                    <AddUserCity
                                      userCitiesList={userCitiesList}
                                      handleOpenModal={handleOpenModal}
                                      onClickAssignCity={onClickAssignCity}
                                      selectedUser={selectedUserForCity}
                                      role={role}
                                    />,
                                    document.body
                                  )}
                              </>
                            </div>
                          </div>
                        );
                      })}
                    </details>
                  </div>
                );
              })}

          {/* City Administrator view */}
          {currentUserRole === "City Administrator" &&
            users
              .filter(
                (aUser) =>
                  !aUser.role.includes("Super Administrator") &&
                  !aUser.role.includes("City Administrator")
              )
              .map((user) => {
                return (
                  <div className="py-5" key={user.email}>
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <h2 className={"editUser_title"}>
                          {user.email} est actuellement un {user.role}
                        </h2>
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
                      {CityAdminRoles.map((role, index) => {
                        return (
                          <div key={index} className={"editUser_container"}>
                            <option
                              className={
                                role === user.role
                                  ? "editUser_labelCurrent"
                                  : "editUser_label"
                              }
                              key={index}
                              value={role}
                            >
                              {role}
                            </option>
                            <button
                              disabled={role === user.role ? true : false}
                              className={
                                role === user.role
                                  ? "primaryButtonDisabled"
                                  : "primaryButton"
                              }
                              onClick={() =>
                                role === "POI Creator"
                                  ? handleSelectedUserForCity(
                                      user.id,
                                      user.email,
                                      role
                                    )
                                  : onClickRoleChange(
                                      user.id,
                                      user.email!,
                                      role!
                                    )
                              }
                            >
                              Select
                            </button>
                            {openModal &&
                              createPortal(
                                <AddUserCity
                                  userCitiesList={userCitiesList}
                                  handleOpenModal={handleOpenModal}
                                  onClickAssignCity={onClickAssignCity}
                                  selectedUser={selectedUserForCity}
                                  role={role}
                                />,
                                document.body
                              )}
                          </div>
                        );
                      })}
                    </details>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
