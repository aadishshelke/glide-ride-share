"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude
};

const GoogleMapComponent = ({ apiKey }) => {
  const [position, setPosition] = useState(center);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={12}>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
