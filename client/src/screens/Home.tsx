import {useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import {filterBySearch} from "../utils/helpers";
import {useCitiesQuery} from "../gql/generated/schema";
import test1 from "../assets/images/test1.jpg"

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

    const {loading: loadingCities, data, refetch} = useCitiesQuery();

    const cities = data?.cities ?? [];

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
            <header className="intro">
                <img className="intro__image" src={test1} alt="Iceland glacier"/>
                <div className="intro__content">
                    <h1 className="intro__title">Essential Feelings</h1>
                    <div className="intro__subtitle">
                        <div className="codrops-links">
                        </div>
                        <div className="intro__description"></div>
                        <button className="trigger">
                            <svg width="100%" height="100%" viewBox="0 0 60 60" preserveAspectRatio="none">
                                <g className="icon icon--grid">
                                    <rect x="32.5" y="5.5" width="22" height="22"/>
                                    <rect x="4.5" y="5.5" width="22" height="22"/>
                                    <rect x="32.5" y="33.5" width="22" height="22"/>
                                    <rect x="4.5" y="33.5" width="22" height="22"/>
                                </g>
                                <g className="icon icon--cross">
                                    <line x1="4.5" y1="55.5" x2="54.953" y2="5.046"/>
                                    <line x1="54.953" y1="55.5" x2="4.5" y2="5.047"/>
                                </g>
                            </svg>
                            <span>View content</span>
                        </button>
                    </div>
                </div>
            </header>
            <section className="items-wrap">
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
            </section>
        </>
        // <>
        //     <form>
        //         <input
        //             value={state.query}
        //             onChange={handleChange}
        //             placeholder="Rechercher une ville..."
        //             type="search"
        //         ></input>
        //     </form>
        //
        //     <div className={"homeStyle"}>
        //         <a href="/manage-cities">
        //             <button className={"addCityButtonStyles"}>
        //                 <AddCircleOutlineOutlinedIcon/>
        //                 <p>AJOUTER UNE VILLE</p>
        //             </button>
        //         </a>
        //         {state.query === ""
        //             // if there is no search, display all cities
        //             ? cities.map((city) => (
        //                 <NavLink key={city.id} to={`/info/${city.name}`}>
        //                     < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
        //                 </NavLink>)
        //             )
        //             :
        //             state.list.map((city) => (
        //                 // if there is a search display the cities corresponding
        //                 <NavLink key={city.id} to={`/info/${city.name}`}>
        //                     < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
        //                 </NavLink>))
        //         }
        //     </div>
        // </>
    )
        ;
}

