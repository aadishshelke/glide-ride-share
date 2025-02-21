"use client";
import GoogleMapSection from "../components/Home/GoogleMapSection";
import SearchSection from "../components/Home/SearchSection";
import SourceContext from "../context/SourceContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { GoogleMap, useJsApiLoader,StandaloneSearchBox } from '@react-google-maps/api'
import AutocompleteComponent from "../components/AutoCompleteComponent";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { useState,useRef } from "react";

export default function Home() {
  const [source,setSource] = useState([])
  const [destination,setDestination] = useState([])
  // const inputref = useRef(null);
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   libraries: ["places"],
  // });

  return (
    <SourceContext.Provider value={{}}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <SearchSection /> 
        </div>
        <div className="col-span-2">
          <GoogleMapSection />
        </div>
      </div>
    </SourceContext.Provider>
  );
}
