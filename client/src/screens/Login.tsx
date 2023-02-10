import CSS from "csstype";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import login from "../assets/login.svg";
import { useGetProfileQuery, useLoginMutation } from "../gql/generated/schema";

const loginPageStyles: CSS.Properties = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  border: "2px solid #E2FE53",
};
const loginContainerStyles: CSS.Properties = {
  height: "100vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
};

const inputStyles: CSS.Properties = {
  textAlign: "center",
  borderRadius: "10px",
  width: "20rem",
  height: "2.5rem",
  border: "2px solid #E2FE53",
};

const primaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  backgroundColor: "#EC5D5C",
  borderRadius: "15px",
  border: "3px solid #EC5D5C",
  color: "#FFFFFF",
};
const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  borderRadius: "15px",
  border: "3px solid #EC5D5C",
};

const tertiaryButtonStyles: CSS.Properties = {
  color: "#EC5D5C",
  fontWeight: 700,
};

const iconStyles: CSS.Properties = {
  height: "15rem",
  width: "auto",
};

const titleStyles: CSS.Properties = {
  fontFamily: "Rubik",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#000000",
};

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [login] = useLoginMutation();

  const { data: currentUser, refetch, client } = useGetProfileQuery();

  return (
    <div style={loginPageStyles}>
      {currentUser && <Navigate to="/" replace={false} />}

      <form
        style={loginContainerStyles}
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { data: credentials } })
            .then(() => {
              client.resetStore();
            })
            .catch((error) => {
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
        <a href="/">
          <h1 style={titleStyles}>MAPADO</h1>
        </a>
        {/* <img src={login} alt="" style={iconStyles} /> */}
        <label htmlFor="email">
          <input
            style={inputStyles}
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
        <label htmlFor="password">
          <input
            style={inputStyles}
            type="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          ></input>
        </label>
        <div>
          <button type="submit" style={primaryButtonStyles}>
            Se connecter
          </button>
          <button style={secondaryButtonStyles}>Créer un compte</button>
        </div>
      </form>
      <a href="/reset-password">
        <button style={tertiaryButtonStyles}>Mot de passe oublié ?</button>
      </a>
    </div>
  );
}
