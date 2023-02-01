import login from '../assets/login.svg'

export default function Login() {
  return (
    <div className={"loginPage"}>
      <div className={"loginContainer"}>
        <a href="/"><h1 className={"loginTitle"}>MAPADO</h1></a>
          <img src={login} alt="" className={"loginIcon"}/>
        <input
          className={"loginInput"}
          type="text"
          placeholder="Nom d'utilisateur /  adresse mail"
        ></input>
        <input
          className={"loginInput"}
          type="text"
          placeholder="Mot de passe"
        ></input>
        <button className={"tertiaryButton"}>Mot de passe oublié ?</button>
        <button className={"primaryButton"}>Se connecter</button>
        <button className={"secondaryButton"}>Créer un compte</button>
      </div>
    </div>
  );
}
