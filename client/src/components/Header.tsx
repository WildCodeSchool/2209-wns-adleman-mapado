import CSS from "csstype";
import { useGetProfileQuery } from "../gql/generated/schema";
import Logout from "./Logout";
import logo from '../assets/images/logo.png';
import { rootCertificates } from "tls";

const HeaderStyles: CSS.Properties = {
  height: "8.6rem",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  // backgroundColor: "#E2FE53",
  fontFamily: "Rubik",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#000000",
  position: "relative",
};

const headerGreenBarStyles: CSS.Properties = {
  backgroundColor: "#E2FE53",
  height: "60rem",
  width: "50rem",
  transform: "rotate(50deg)",
  position: "relative",
  marginLeft: "-45rem"
}

const searchBarStyles: CSS.Properties = {
  height: "2.5rem",
  width: "20rem",
  fontWeight: 700,
  fontSize: "1rem",
  color: "#000000",
  borderRadius: "10px",
  marginLeft: "5rem",
  border: "2px solid #E2FE53",
  padding: "1rem"
};

const logoStyles: CSS.Properties = {
  height: "4rem",
  width: "auto",
  position: "absolute",
  zIndex: 10,
  marginTop: "-2.5rem",
}

export default function Header() {

  return (
    <div style={HeaderStyles}>
        <a href="/home"><img src={logo} alt="Mapado" style={logoStyles}/></a>
      <div style={headerGreenBarStyles}></div>
 
      <input
        style={searchBarStyles}
        type="text"
        placeholder="Rechercher une ville"
      ></input>
       <Logout />
    </div>
  );
}
