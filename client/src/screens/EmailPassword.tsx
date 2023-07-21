import { useState } from "react";
import { useSendPasswordEmailMutation } from "../gql/generated/schema";
import {useNavigate} from "react-router";
import Card from "../components/Card";
import toast from "react-hot-toast";

export default function PasswordReset() {
  const [email, setEmail] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
};

  const [sendEmail] = useSendPasswordEmailMutation();
  return (
    <>
      <Card customClass={"emailPasswordCard"}>
        <form
          className={"emailPasswordContainer"}
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail({ variables: { data: email } })
              .then(() => {
                console.log("ok");
              })
              .catch(console.error);
          }}
        >
          <p>
            Saissiez votre email. Vous y recevrez un lien permettant de modifier
            votre mot de passe.
          </p>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email.email}
              onChange={(e) => setEmail({ email: e.target.value })}
            ></input>
          </label>
          <div>
            <button className={"primaryButton"} onClick={goBack}>Retour</button>
            <button
              type="submit"
              className={"tertiaryButton"}
              onClick={() =>
                toast(
                  "Si vous avez un compte Mapado, vous recevrez un email pour réinitialiser votre mot de passe",
                  {
                    style: {
                      border: "3px solid",
                      padding: "4rem",
                    },
                  }
                )
              }
            >
              Valider
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}
