import { useState } from "react";
import Header from "../components/Header";
import { useCreateUserMutation } from "../gql/generated/schema";
import Card from "../components/Card";

export default function Register() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState(false);

  const [createUser] = useCreateUserMutation();

  const togglePassword = () => setPasswordShown(!passwordShown);
  return (
    <>
      <Header />
      <Card customClass={"registerCard"}>
        <form
          className={"registerContainer"}
          onSubmit={(e) => {
            e.preventDefault();
            createUser({ variables: { data: userInfo } })
              .then(() => {
                console.log("ok");
              })
              .catch(console.error);
          }}
        >
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Adresse mail"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            ></input>
            <button type="button" onClick={togglePassword}>
              Show Password
            </button>
          </label>
          <label htmlFor="password">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Mot de passe"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            ></input>
          </label>
          <button type="submit" className={"tertiaryButton"}>
            Créer un compte
          </button>
        </form>
      </Card>
    </>
  );
}
