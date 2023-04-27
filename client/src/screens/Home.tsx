import {useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import {filterBySearch} from "../utils/helpers";
import {useCitiesQuery} from "../gql/generated/schema";

interface Cities {
    cities: ICity[];
}



interface IState {
    query: string;
    list: ICity[];
}

// interface currentUser {
//   email: string;
//   password: string
// }

export default function Home() {
    // gets the paras from URL
    const [searchParams, setSearchParams] = useSearchParams();

    const { loading: loadingCities, data, refetch } = useCitiesQuery();

    const cities = data?.cities ?? [];
console.log(cities)
    // State to manage both URL query & cities to display
    const [state, setState] = useState<IState>({
        query: searchParams.get("query") ?? "",
        list: [],
    });

    // takes in value from the search bar and returns a filtered list of the cities to display
    //(filter improves with each letter)
    //searchParams controls the URL (what comes after the "?")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const results = cities.filter((city) => {
            if (e.target.value.trim() === "") return cities;
            return city.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase());
        });
        setSearchParams({query: e.target.value});
        setState({
            query: e.target.value,
            list: results,
        });
    };

    return (
        <>
            <form>
                <input
                    value={state.query}
                    onChange={handleChange}
                    placeholder="Rechercher une ville..."
                    type="search"
                ></input>
            </form>

            <div className={"homeStyle"}>
                <a href="/manage-cities">
                    <button className={"addCityButtonStyles"}>
                        <AddCircleOutlineOutlinedIcon/>
                        <p>AJOUTER UNE VILLE</p>
                    </button>
                </a>
                {state.query === ""
                    // if there is no search, display all cities
                    ? cities.map((city) => (
                        <NavLink key={city.id} to={`/info/${city.name}`}>
                            < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
                        </NavLink>)
                    )
                    :
                    state.list.map((city) => (
                        // if there is a search display the cities corresponding
                        <NavLink key={city.id} to={`/info/${city.name}`}>
                            < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
                        </NavLink>))
                }
            </div>
        </>
    )
        ;
}

