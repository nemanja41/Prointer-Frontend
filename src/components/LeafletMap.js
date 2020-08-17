import React from "react";
import "./LeafletMap.css";
import { Map, Polyline, TileLayer } from "react-leaflet";
import { useAppContext } from "../libs/contextLib";

const LeafletMap = () => {
  const { multiPolyline, center, zoom } = useAppContext();

  return (
    <Map id="mapa" center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline color="purple" positions={multiPolyline} />
    </Map>
  );
};
export default LeafletMap;
