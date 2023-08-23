import { useState } from "react";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetProfileQuery, useLoginMutation } from "../gql/generated/schema";
import Card from "../components/Card";
import { useNavigate } from "react-router";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [login] = useLoginMutation();
  const { data: currentUser, client } = useGetProfileQuery();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const navigateEmailPassword = () => navigate("/password/email");

  const togglePassword = () => setPasswordShown(!passwordShown);

  const navigateCreateAccount = () => navigate("/register");

  const navigateHome = () => navigate("/cities-list");

  return (
    <>
      <div className={"loginStyle"}>
        <button className={"backButton"} onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />

          </svg>
        </button>
        <Card customClass={" registerCard"}>
          <form
            className={"loginContainer"}
            onSubmit={(e) => {
              e.preventDefault();
              login({ variables: { data: credentials } })
                .then(() => {
                  client.resetStore();
                  navigateHome();
                  console.log(currentUser?.profile.role);
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Invalid credentials", {
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
                });
            }}
          >
            {/* <img src={login} alt="" style={iconStyles} /> */}
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Adresse mail"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              ></input>
            </label>
            {/*  */}
            <label htmlFor="password">
              <input
                className={"passwordInput"}
                id="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              ></input>{" "}
              <button
                type="button"
                onClick={togglePassword}
                style={{ color: "#EC5D5C" }}
              >
                {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </label>
            <div className={"loginButtonsContainer"}>
              <button
                type="button"
                className={"primaryButtonEmailPassword"}
                onClick={navigateEmailPassword}
              >
                Mot de passe oublié ?
              </button>
              <button type="submit" className={"tertiaryButton"}>
                Se connecter
              </button>
              <button
                type="button"
                className={"tertiaryButton"}
                onClick={navigateCreateAccount}
              >
                Créer un compte
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
