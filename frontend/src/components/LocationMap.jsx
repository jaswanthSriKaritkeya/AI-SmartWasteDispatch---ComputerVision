import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const ChangeMapView = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 15);
  }, [position, map]);

  return null;
};

const LocationMap = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        setPosition([latitude, longitude]);
        setError("");
      },
      (error) => {
        console.error("Location access failed:", error);

        if (error.code === error.PERMISSION_DENIED) {
          setError("Location permission was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError("Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          setError("Location request timed out.");
        } else {
          setError("Unable to get your location.");
        }
      }
    );
  };

  return (
    <div>
      <h2>User Location</h2>

      <button onClick={getLocation}>
        Get My Location
      </button>

      {error && <p>{error}</p>}

      {position && (
        <>
          <p>Latitude: {position[0]}</p>
          <p>Longitude: {position[1]}</p>

          <div style={{ height: "500px", width: "100%" }}>
            <MapContainer
              center={position}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <ChangeMapView position={position} />

              <Marker position={position}>
                <Popup>
                  📍 Your current location
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationMap;