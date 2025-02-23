"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import GoogleMapSection from "../components/Home/GoogleMapSection";
import SearchSection from "../components/Home/SearchSection";
import SourceContext from "../context/SourceContext";
import DestinationContext from "../context/DestinationContext";
import { useState } from "react";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ["places"], // Important for autocomplete functionality
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchSection />
          </div>
          <div className="col-span-2">
            <GoogleMapSection />
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
