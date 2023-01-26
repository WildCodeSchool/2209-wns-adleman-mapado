import { Route, Routes } from "react-router-dom";
import CSS from 'csstype';
import Home from "./screens/Home";
import Header from './components/Header';
import AddManageCities from './components/AddManageCities';
import "./App.css";
import bordeaux from "./assets/bordeaux.jpeg";
import lille from "./assets/lille.jpeg";
import paris from "./assets/paris.jpeg";


const styles: CSS.Properties = {
  margin: 0,
  backgroundSize: 'cover',
  backgroundColor: '#3270F4',
};

const cities: {
  id: number;
  name: string;
  city_area: string;
  photo?: string;
  user: {}[];
}[] = [
  {
    id: 1,
    name: "Bordeaux",
    city_area: "44.8473900254569, -0.7188799313856008",
    photo: bordeaux,
    user: ["1", "2", "3"],
  },
  {
    id: 2,
    name: "Lille",
    city_area: "50.62976866778606, 3.04621070309212",
    photo: lille,
    user: ["4", "5", "6"],
  },
  {
    id: 3,
    name: "Paris",
    city_area: "48.87170691129766, 2.325403812427441",
    photo: paris,
    user: ["7", "8", "9"],
  },
  {
    id: 4,
    name: "Marseille",
    city_area: "43.332225160179654, 5.398493055776797",
    user: ["10", "11", "12"],
  },
];


function App() {
  return (
    <div style={styles}>
      <Header />
      <Routes>
      <Route path="/" element={<Home cities={cities} />} />
      <Route path="/manage-cities" element={<AddManageCities cities={cities}/>} />
      </Routes>
    </div>
  );
}

export default App;
