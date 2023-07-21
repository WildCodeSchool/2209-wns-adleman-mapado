import CSS from "csstype";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChangePasswordMutation,
  useFetchTokenQuery,
} from "../gql/generated/schema";
import {useNavigate} from "react-router";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { redirect } from "react-router";

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
  marginTop: "10rem"
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
  color: "#FFFFFF",
  margin: "10rem",
  borderRadius: "15px",
  border: "3px solid #173472",
};

const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "15px",
  border: "3px solid #173472",
  color: "#EC5D5C",
};

const togglePasswordStyle: CSS.Properties = {
    color: "#EC5D5C",
    margin: "0.5rem",
}

const title: CSS.Properties = {
  color: "#ec5d5c",
  fontFamily: 'Rubik',
  fontWeight: 600,
  fontSize: "1.5rem",
  textAlign: "left",
  marginTop: "10rem",
}

export default function PasswordReset() {

  // const [serverToken, setServerToken] = useState({});
  const [cleanToken, setCleanToken] = useState("");
  const [cleanServerToken, setCleanServerToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const { token, id } = useParams();

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
}

const goBack = () => {
  navigate(-1);
};

const goToError = () => {
  navigate("/404")
}

  //create clean string form of id
  const cleanId = id?.replace(/[:]+/g, "") ?? "0";

  const [credentials, setCredentials] = useState({
    id: id ?? "",
    newPassword: "",
  });

  // mutation to get the changeEmailToken from the server
    const {data: serverToken} = useFetchTokenQuery({
    // + turns string into number
    variables: { fetchTokenId: +cleanId },
    // onCompleted: (response) => {
    //   setServerToken(JSON.stringify(response.fetchToken.changePasswordToken));
    // },
  });
  // console.log(serverToken?.fetchToken.changePasswordToken)
  // console.log(serverToken)

  const [changePassword] = useChangePasswordMutation();


  async function cleanedServerToken(serverToken: any){
    // await something but whaaat ?
    const cleanedToken =  JSON.stringify(serverToken)
    .replace(/[\\]/g, "")
    .replace(/['"]+/g, "");
    setCleanServerToken(() => cleanedToken);
  }
    
  function cleanedToken(token: string) {
    const cleanedToken = token?.replace(/[:]+/g, "");
    setCleanToken(() => cleanedToken);
  }
   
    const redirectPage = async () => {
      return redirect("/404")
   }

  // useEffect(() => {
    // setTimeout(() => {
      (async function compareTokens() {
        // console.log("delayed for one second")
        await token && cleanedToken(token!);
        await serverToken && cleanedServerToken(serverToken!);
        // console.log(cleanToken);
        // console.log(cleanServerToken);
        // console.log(cleanToken === cleanServerToken)
        if ( cleanToken !== cleanServerToken) { 
          console.log("server token does not match param token")
          redirectPage()
          // goToError()
       }
       if (!cleanToken) console.log("no clean token")
      })()
    // }, 2000)
   
  // }, [cleanToken, cleanServerToken])


  return (
    <>
      <div style={resetPasswordStyles}>
        <h3 style={title}>Entrez un nouvel mot de passe</h3>
        <form
          style={passwordResetContainerStyles}
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({ variables: { newPassword: credentials.newPassword, changePasswordId: +credentials.id } })
              .then(() => {
                toast.success("Votre mot de pass a bien été modifié", {
                  style: {
                    border: "3px solid",
                    padding: "4rem",
                  }})
                ;
              }).then(() => goToLogin())
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
            <button type="button" onClick={togglePassword} style={togglePasswordStyle}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>
          </label>
          <div>
            <button style={secondaryButtonStyles} onClick={goBack}>Retour</button>
            <button type="submit" style={primaryButtonStyles}>
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}