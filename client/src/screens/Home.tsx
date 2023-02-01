import CityCard from "../components/CityCard";

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

export default function Home({ cities }: Cities) {

  return (
    <div className={"home_container"}>
      <a href="/manage-cities">
        <button className={"addCityButton"}>
          <p>AJOUTER UNE VILLE</p>
        </button>
      </a>
      {cities.map((city: City) => {
        return (
          <CityCard key={city.id} cityName={city.name} cityPhoto={city.photo} />
        );
      })}
    </div>
  );
}
