import {Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import CSS from "csstype";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Header from "./components/Header";
import ManageCities from "./screens/ManageCities";
import Map from "./components/Map";
import "./App.css";
import {useCitiesQuery} from "./gql/generated/schema";
import Register from "./screens/Register";
import PasswordReset from "./screens/PasswordReset";
import EmailPassword from "./screens/EmailPassword";
import InfoCity from "./screens/InfoCity";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";

const styles: CSS.Properties = {
    margin: 0,
    backgroundSize: "100vw",
};

function App() {
    const {loading: loadingCities, data} = useCitiesQuery();
    const [showHeader, setShowHeader] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const path = window.location.pathname;
        setShowHeader(path !== "/login" && path !== "/");
    }, [location]);

    // const cities = data?.cities ?? [];

    return (
        <>
            <Toaster position="top-center"/>
            <div style={styles}>
                {showHeader && <Header/>}
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/password/email" element={<EmailPassword/>}/>
                    <Route
                        path="/password/reset/:id/:token"
                        element={<PasswordReset/>}
                    />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/manage-cities" element={<ManageCities/>}/>
                    <Route path="/info/:cityName" element={<InfoCity/>}/>
                    {/*<Route path="/map" element={<Map/>} />*/}
                </Routes>
            </div>
        </>
    );
}

export default App;
