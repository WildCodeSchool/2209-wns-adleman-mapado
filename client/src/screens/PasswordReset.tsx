import CSS from "csstype";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChangePasswordMutation,
  useFetchTokenQuery,
} from "../gql/generated/schema";

const resetPasswordStyles: CSS.Properties = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#173472",
  position: "absolute",
  paddingTop: "2rem",
};

const passwordResetContainerStyles: CSS.Properties = {
  height: "100vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#173472",

  justifyContent: "space-around",
  alignItems: "center",
  border: "2px solid #E2FE53",
};

const inputStyles: CSS.Properties = {
  textAlign: "center",
  borderRadius: "10px",
  width: "50rem",
  height: "3.5rem",
  border: "2px solid #EC5D5C",
  fontFamily: "Rubik",
};

const primaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  backgroundColor: "#EC5D5C",
  border: "3px solid #EC5D5C",
  color: "#FFFFFF",
  margin: "10rem",
};

const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  border: "3px solid #EC5D5C",
};

export default function PasswordReset() {

  const [serverToken, setServerToken] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const { token, id } = useParams();

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
        {/* <img src={lost} alt="lost" /> */}
        <p>OOOPPS invalid token</p>
      </div>
    );

  return (
    <>
      <div style={resetPasswordStyles}>
        <form
          style={passwordResetContainerStyles}
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({ variables: { newPassword: credentials.newPassword, changePasswordId: +credentials.id } })
              .then(() => {
                console.log("success");
              })
              .catch(console.error);
          }}
        >
          <label htmlFor="newPassword">
            <input
              style={inputStyles}
              type={showPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Nouveau mot de passe"
              value={credentials.newPassword}
              onChange={(e) =>
                setCredentials({ id: cleanId ?? "", newPassword: e.target.value })
              }
            ></input>
            <button type="button" onClick={togglePassword}>{showPassword ? "Hide password" : "Show password"}</button>
          </label>
          <div>
            <button style={secondaryButtonStyles}>Retour</button>
            <button type="submit" style={primaryButtonStyles}>
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
