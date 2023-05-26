import React, {useState} from "react";
import Logout from "./Logout";
import {Link} from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png"

export default function Header() {
    const [headerWithShadow, setHeaderWithShadow] = useState(false)
    const changeNavStyle = () => {
        if(window.scrollY >= 10){
            setHeaderWithShadow(true)
        }else{
            setHeaderWithShadow(false)
        }
    }

    window.addEventListener('scroll', changeNavStyle)

    return (

        <nav className={`headerStyle${headerWithShadow ? " headerWithShadow" : ''}`}>
            <Link to="/">
                <img src={Mapado}/>
            </Link>

            {/* <div className="intro__subtitle">
                <div className="codrops-links">
                    <div className="intro__description">
                        <p>
                            Locate, discover & share !
                        </p>
                        <div className="demos">
                            <Link to="/cities-list">Accueil</Link>
                            <Link to="/manage-cities">
                                Admin
                            </Link>
                            <Link to="/login">
                                Connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
        </nav>

    )
        ;
}
