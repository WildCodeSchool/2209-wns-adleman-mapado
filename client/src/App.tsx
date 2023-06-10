import {Route, Routes} from "react-router-dom";
import CSS from "csstype";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Header from "./components/Header";
import ManageCities from "./screens/ManageCities";
import "./App.css";
import Register from "./screens/Register";
import PasswordReset from "./screens/PasswordReset";
import EmailPassword from "./screens/EmailPassword";
import InfoCity from "./screens/InfoCity";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import EditCity from "./screens/EditCity";
import CitiesList from "./screens/CitiesList";
import Admin from "./screens/Admin";
import ManageCategories from "./screens/ManageCategories";

const styles: CSS.Properties = {
    margin: 0,
    backgroundSize: "100vw",
};

function App() {
    const [showHeader, setShowHeader] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const path = window.location.pathname;
        setShowHeader(path !== "/");
    }, [location]);

    return (
        <>
            <div style={styles}>
                {showHeader && <Header/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/password/email" element={<EmailPassword/>}/>
                    <Route
                        path="/password/reset/:id/:token"
                        element={<PasswordReset/>}
                    />
                    <Route path="/cities-list" element={<CitiesList/>}/>
                    <Route path="/info/:cityName" element={<InfoCity/>}/>
                    <Route path="/manage-cities" element={<ManageCities/>}/>
                    <Route path="/edit-city/:cityName" element={<EditCity/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/manage-categories" element={<ManageCategories/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
