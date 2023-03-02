import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";

interface MapProps {
    longitude: number;
    latitude: number;
}

function Map({longitude, latitude}:MapProps) {
    console.log(longitude, latitude)

    return (
        <MapContainer
            className="map-container"
            center={[{latitude}, {longitude}]}
            zoom={13}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[48.85842, 2.3535]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    );
}

export default Map;