import CSS from "csstype";
import CityCard from "../components/CityCard";
import { useCitiesQuery } from "../gql/generated/schema";

const styles: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "2rem",
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

// interface City {
//   id: number;
//   name: string;
//   city_area: string;
//   photo?: string;
//   user: {}[];
// }

// interface Cities {
//   cities: City[];
// }

export default function Home() {

  const {loading: loadingCities, data} = useCitiesQuery()
  const cities=data?.cities || [];
  console.log(cities)

  return (
    <div style={styles}>
      <a href="/manage-cities">
        <button style={addCityButtonStyles}>
          <p>AJOUTER UNE VILLE</p>
        </button>
      </a>

      {cities.map((city) => {
        return (
          <CityCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
        );
      })}
    </div>
  );
}
