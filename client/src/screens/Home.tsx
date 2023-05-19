import {useEffect, useState} from "react";
import {Link, NavLink, useSearchParams} from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import {filterBySearch} from "../utils/helpers";
import {useCitiesQuery} from "../gql/generated/schema";
import IState from "../interfaces/IState";
import directions from "../assets/images/directions.png"

export default function Home() {
    // gets the params from URL
    const [searchParams, setSearchParams] = useSearchParams();

    const {loading: loadingCities, data, refetch} = useCitiesQuery();

    const cities = data?.cities ?? [];
    // State to manage both URL query & cities to display
    const [state, setState] = useState<IState>({
        query: searchParams.get("query") ?? "",
        list: [],
    });

    const [headerShown, setHeaderShown] = useState(true)

    useEffect(() => {
        if (headerShown) {
            document.body.style.overflow = "hidden";
        } else (
            document.body.style.overflow = "auto"
        )
        console.log(headerShown)

    }, [headerShown])


    // takes in value from the search bar and returns a filtered list of the cities to display
    //(filter improves with each letter)
    //searchParams controls the URL (what comes after the "?")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const results = cities.filter((city) => {
            if (e.target.value === " ") return cities;
            return city.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setSearchParams({query: e.target.value});
        setState({
            query: e.target.value,
            list: results,
        });
    };

    function toggleMenu() {
        const container = document.getElementById('container'),
            trigger = container?.querySelector('button.trigger');

        container?.classList.toggle('container--open')
        trigger?.classList.toggle('trigger--active')
        setHeaderShown(!headerShown)
    }

    return (
        <>
            <div id="container">
                <header className="intro">
                    <div className="intro__image" style={{display:"flex", alignItems: "center"}}>
                        <img src={directions} alt="character-with-map"/>
                    </div>
                    <div className="intro__content">
                        <h1 className="intro__main__title">Locate, discover & share !</h1>
                        <h1 className="intro__title">Mapado</h1>
                        <div className="intro__subtitle">
                            <div className="codrops-links">
                                <div className="intro__description">
                                    <p>
                                        L'application qui géolocalise les centres d'intérêts à découvrir dans les villes
                                        que vous
                                        visitez.
                                    </p>
                                    <div className="demos">
                                        <Link to="/manage-cities" onClick={()=> setHeaderShown(false)}>
                                            Admin
                                        </Link>
                                        <Link to="/login">
                                            Connexion
                                        </Link>
                                    </div>
                                    <div className="search-input">
                                        <form>
                                            <input
                                                value={state.query}
                                                onChange={handleChange}
                                                placeholder="Rechercher une ville..."
                                                type="search"
                                            ></input>
                                        </form>
                                    </div>
                                </div>
                                <button className="trigger" onClick={toggleMenu}>
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
                    </div>
                </header>
                <section className="items-wrap">
                    {state.query === ""
                        // if there is no search, display all cities
                        ? cities.map((city) => (
                            <NavLink className='cardLink' key={city.id} to={`/info/${city.name}`}>
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
            </div>
        </>
    )
}