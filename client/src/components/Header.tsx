import React from "react";
import Logout from "./Logout";
import {Link} from "react-router-dom";
import Mapado from "../assets/images/Mapado.png"

export default function Header() {
    return (
        <div>
            <nav className={"headerStyle"}>
                <div>
                    <Link to="/"> <img src={Mapado} alt="Logo"/>
                    </Link>
                </div>
                <Logout/>
            </nav>
        </div>

    );
}
