import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import CSS from "csstype";
import {
  useChangePasswordMutation,
  useFetchTokenQuery,
} from "../gql/generated/schema";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";

const passwordResetContainerStyles: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10rem",
  justifyContent: "space-around",
  alignItems: "center",
};

const inputStyles: CSS.Properties = {
  textAlign: "center",
  borderRadius: "10px",
  width: "30rem",
  height: "3.5rem",
  border: "2px solid #EC5D5C",
  fontFamily: "Rubik",
};

const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "6rem",
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  border: "3px solid #173472",
};

const primaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  borderRadius: "15px",
  border: "3px solid #173472",
  backgroundColor: "#EC5D5C",
  color: "white",
};

export default function PasswordReset() {
  const [serverToken, setServerToken] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const { token, id } = useParams();

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  //create clean string form of id
  const cleanId = id?.replace(/[:]+/g, "") ?? "0";

  const [credentials, setCredentials] = useState({
    id: id ?? "",
    newPassword: "",
  });

  // mutation to get the changeEmailToken from the server
  useFetchTokenQuery({
    // + turns string into number
    variables: { fetchTokenId: +cleanId },
    onCompleted: (response) => {
      //response back to client from server is the token saved in the database
      setServerToken(JSON.stringify(response.fetchToken.changePasswordToken));
    },
  });

  //Mutation to replace old password with new password in database
  const [changePassword] = useChangePasswordMutation();

  // if params token === serverEmailToken then display the page else display an error message / page
  // same as clean id, we need to stringify and clean up serverToken response and params token
  const cleanServerToken = JSON.stringify(serverToken)
    .replace(/[\\]/g, "")
    .replace(/['"]+/g, "");
  const cleanToken = token?.replace(/[:]+/g, "");

  if (!token || cleanToken !== cleanServerToken)
    return (
      <div>
        <p>OOOPPS invalid token</p>
      </div>
    );

  return (
    <>
      <form
        className={"passwordResetContainerStyles"}
        style={passwordResetContainerStyles}
        onSubmit={(e) => {
          e.preventDefault();
          if (credentials.newPassword === "") {
            toast.error("Erreur dans l'enregistrement du mot de passe", {
              style: {
                border: "3px solid #EC5D5C",
                padding: "4rem",
                color: "#EC5D5C",
              },
              iconTheme: {
                primary: "#EC5D5C",
                secondary: "#FFFFFF",
              },
            });
          } else {
            changePassword({
              variables: {
                newPassword: credentials.newPassword,
                changePasswordId: +credentials.id,
              },
            }).then(() => {
              toast.success("Nouveau mot de passe enregistré !");
              console.log("success");
              setTimeout(() => {
                goToLogin();
              }, 2000);
            });
          }
        }}
      >
        <label htmlFor="newPassword">
          <input
            className={"inputStyles"}
            style={inputStyles}
            type={showPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Nouveau mot de passe"
            value={credentials.newPassword}
            onChange={(e) =>
              setCredentials({
                id: cleanId ?? "",
                newPassword: e.target.value,
              })
            }
          ></input>
          <button
            type="button"
            onClick={togglePassword}
            style={{ color: "#EC5D5C", marginLeft: "1rem" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </label>
        <div>
          <button
            type="submit"
            className={"primaryButtonStyles"}
            style={primaryButtonStyles}
          >
            Valider
          </button>
          <button
            className={"secondaryButtonStyles"}
            style={secondaryButtonStyles}
          >
            Retour
          </button>
        </div>
      </form>
    </>
  );
}
