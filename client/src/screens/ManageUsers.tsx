import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  useCitiesQuery,
  useGetProfileQuery,
  useUpdateUserCityMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
} from "../gql/generated/schema";

const SuperAdminRoles = [
  "Visitor",
  "POI Creator",
  "City Administrator",
  "Super Administrator",
];
const CityAdminRoles = ["Visitor", "POI Creator"];

export default function ManageUsers() {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    role: "",
  });
  const [dataForUpdate, setDataForUpdate] = useState({cityName: ""},)

  const navigate = useNavigate();

  const { loading: loadingUsers, data: usersData, refetch } = useUsersQuery();
  const users = usersData?.users ?? [];

  const [updateUser] = useUpdateUserRoleMutation();

  const { data: citiesData } = useCitiesQuery();

  const cities = citiesData?.cities ?? [];

  const { data: currentUser } = useGetProfileQuery();
  const currentUserRole = currentUser?.profile?.role;

  const [updateCity] = useUpdateUserCityMutation({onCompleted: () => refetch()})

  const onClickRoleChange = async (
    email: string,
    role: string
  ): Promise<void> => {
    try {
      setUserDetails({
        email,
        role,
      });
      updateUser({ variables: { data: { email, role } } });
      refetch();
      toast.success(`Role mis à jour : ${email} est désormais ${role}`);
    } catch (e) {
      toast.error(`Could not update role : ${e}`);
    }
  };
  const handleClose = () => {
    setOpen(false);
};
// const handleUpdateCity = () => {
//   updateCity({
//       variables: {
//            updateCityId: parseInt(cityIdforModal),
//           updateCityData: dataForUpdate
//       }
//   });
//   setCityIdForModal('')
//   setOpen(false);
// }

  const onClickOpenModal = () => {

    return (
      cities.map((city) => {
        return ( <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier la catégorie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer un nouveau nom
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Nom"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDataForUpdate({cityName: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    {/* <Button onClick={handleUpdateCity}>Envoyer</Button> */}
                </DialogActions>
            </Dialog>)
      })
    )
  }

  useEffect(() => {
    refetch();
  }, [userDetails, refetch()]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
        <button className={"backButton"} onClick={goBack}>
          {" "}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
          </svg>
        </button>
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          <h2 className={"title"}>Gérer les utilisateurs</h2>
          {currentUserRole === "Super Administrator" &&
            users.map((user) => {
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
                          <button
                            disabled={role === user.role ? true : false}
                            className={
                              role === user.role
                                ? "primaryButtonDisabled"
                                : "primaryButton"
                            }
                            onClick={(): void => {
                              if (user.email && role)
                                onClickRoleChange(user.email, role);
                            }}
                          >
                            Select
                          </button>
                        </div>
                      );
                    })}
                  </details>
                </div>
              );
            })}
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
                              onClick={(): void => {
                                if ((user.email) && (role === "Super Administrator" || role === "Visitor")) {
                                  onClickRoleChange(user.email, role);
                                }
                                if ((user.email) && (role === "City Administrator" || role === "POI Creator")) {
                                  onClickOpenModal()
                                }
                                  
                              }}
                            >
                              Select
                            </button>
                          </div>
                        );
                      })}
                    </details>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}
