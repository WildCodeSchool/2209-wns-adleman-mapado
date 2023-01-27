import React from "react";
import "./App.css";
import {gql, useQuery} from '@apollo/client';
import binoculars from "./assets/images/binculars.png"

const GET_CITIES = gql`
query Cities {
  cities {
    id
    name
  }
}
`

interface Cities {
    id: number;
    name: string;
}

function App() {
    const {data} = useQuery<{ cities: Cities[] }>(GET_CITIES);
    console.log(data)

    const cities = data?.cities || []

    return (
        <div className="App">
            <div className={"title"}>
                <h1>
                    Mapado
                </h1>
                <img src={binoculars} alt={"binoculars"}/>
            </div>

            <div className={"cities"}>
                {cities.map((c) =>
                    <h1 key={c.id} className={"city"}>{c.name}</h1>
                )}
            </div>
        </div>
    );
}

export default App;
