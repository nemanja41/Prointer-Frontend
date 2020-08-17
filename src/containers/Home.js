import React from "react";
import "./Home.css";
import LeafletMap from "../components/LeafletMap";
import { useAppContext } from "../libs/contextLib";
import Coord from "../components/Coord";
import CoordForm from "../components/CoordForm";

export default function Home() {
  const {
    multiPolyline,
    setMultiPolyline,
    isAuthenticated,
    setCenter,
  } = useAppContext();

  const removeCoord = (index) => {
    const newData = multiPolyline.filter((v, i) => i !== index);
    setMultiPolyline(newData);
    //Postavi novi centar na prvu koordinatu
    setCenter(newData[0]);
  };

  return (
    <div className="Home">
      <div className="lander">
        <div id="map">
          <LeafletMap />
          <div className="map-coords">
            {multiPolyline.map((coord, index) => (
              <Coord
                long={coord[0]}
                lat={coord[1]}
                onClick={() => removeCoord(index)}
              />
            ))}
            {isAuthenticated && <CoordForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
