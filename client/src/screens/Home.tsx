import {useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useCitiesQuery, useGetCityQuery} from "../gql/generated/schema";
import Header from "../components/Header";
import AnimatedCard from "../components/AnimatedCard";

interface City {
    id: number;
    name: string;
    latitude?: number | null | undefined;
    longitude?: number | null | undefined;
    photo?: string | null | undefined;
    // users?: User[];
    // poi?: Poi[];
}

interface Cities {
    cities: City[];
}

interface IState {
    query: string;
    list: City[];
}

// interface currentUser {
//   email: string;
//   password: string
// }

export default function Home({cities}: Cities) {
    const [toLoginPage, setToLoginPage] = useState(false);

    // gets the paras from URL
    const [searchParams, setSearchParams] = useSearchParams();

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
            if (e.target.value === " ") return cities;
            return city.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        console.log(results)
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

