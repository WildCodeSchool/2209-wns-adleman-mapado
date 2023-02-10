import CSS from "csstype";
import { truncate } from "fs";
import { useEffect, useState } from "react";
import { Routes } from "react-router";
import { Route } from "react-router-dom";
import CityCard from "../components/CityCard";
import {
  useCitiesQuery,
  useGetProfileQuery,
  useLogoutMutation,
} from "../gql/generated/schema";
import { Location } from "history";
import Login from "./Login";
import Logout from "../components/Logout";
import Header from "../components/Header";

const styles: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  position: "absolute",
  backgroundColor: "#FFFFFF"
};
const addCityButtonStyles: CSS.Properties = {
  height: "17rem",
  width: "15.6rem",
  border: "10px solid #EC5D5C",
  borderRadius: "40px",
  backgroundColor: "#FFFFFF",
  margin: "2rem",
  color: "#EC5D5C",
  fontFamily: "Josefin Sans",
  fontWeight: 700,
  fontSize: "1.25rem",
};

interface City {
  id: number;
  name: string;
  city_area: string;
  photo?: string;
  user: {}[];
}

interface Cities {
  cities: City[];
}

// interface currentUser {
//   email: string;
//   password: string
// }

export default function Home({cities}: Cities) {
  const [toLoginPage, setToLoginPage] = useState(false);
  const { loading: loadingCities, data } = useCitiesQuery();

  // const cities = data?.cities || [];



  return (
    <>
    <Header />
    <div style={styles}>
      <a href="/manage-cities">
        <button style={addCityButtonStyles}>
          <p>AJOUTER UNE VILLE</p>
        </button>
      </a>

      {cities.map((city) => {
        return <CityCard key={city.id} cityName={city.name} />;
      })}
    </div>
    </>
  );
}
