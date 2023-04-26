import {useState} from "react";
import {Navigate, Link} from "react-router-dom";
import toast from "react-hot-toast";
import login from "../assets/images/login.svg";
import {useGetProfileQuery, useLoginMutation} from "../gql/generated/schema";
import Card from "../components/Card";
import {useNavigate} from "react-router";
import Header from "../components/Header";

export default function Login() {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [passwordShown, setPasswordShown] = useState(false);
    const [login] = useLoginMutation();
    const {data: currentUser, client} = useGetProfileQuery();

    const navigate = useNavigate();

    const navigateEmailPassword = () => navigate("/password/email");

    const togglePassword = () => setPasswordShown(!passwordShown);

    const navigateCreateAccount = () => navigate("/register")
    
    return (
        <>
            <Link to="/">
                <Header/>
            </Link>
            <div className={"loginStyle"}>
                {currentUser && <Navigate to="/" replace={false}/>}
                <Card customClass={"registerCard"}>

                    <form
                        className={"loginContainer"}
                        onSubmit={(e) => {
                            e.preventDefault();
                            login({variables: {data: credentials}})
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
                        {/* <img src={login} alt="" style={iconStyles} /> */}
                        <label htmlFor="email">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Adresse mail"
                                value={credentials.email}
                                onChange={(e) =>
                                    setCredentials({...credentials, email: e.target.value})
                                }
                            ></input>
                        </label>
                        {/*  */}
                        <label htmlFor="password">
                            <input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Mot de passe"
                                value={credentials.password}
                                onChange={(e) =>
                                    setCredentials({...credentials, password: e.target.value})
                                }
                            ></input>
                            <div>
                                <button type="button" onClick={togglePassword} style={{color: "#EC5D5C"}}>
                                    Afficher le mot de passe
                                </button>
                            </div>
                            {/*  */}
                        </label>
                        <div className={"loginButtonsContainer"}>
                            <button
                                type="button"
                                className={"primaryButton"}
                                onClick={navigateEmailPassword}
                            >
                                Mot de passe oublié ?
                            </button>
                            <button type="submit" className={"tertiaryButton"}>
                                Se connecter
                            </button>
                            <button type="button" className={"tertiaryButton"} onClick={navigateCreateAccount}>Créer un
                                compte
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
