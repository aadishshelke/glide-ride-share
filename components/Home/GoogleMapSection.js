"use client";
import React from "react";
import { GoogleMap } from "@react-google-maps/api";

function GoogleMapSection() {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  // No need to load the API again here.
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Child components such as markers or info windows */}
    </GoogleMap>
  );
}

export default GoogleMapSection;
