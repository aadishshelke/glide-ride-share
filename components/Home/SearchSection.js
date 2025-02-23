"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import SourceContext from "../../context/SourceContext";
import DestinationContext from "../../context/DestinationContext";
import CarListOptions from "../CarListOptions"

function SearchSection() {
  const sourceContext = useContext(SourceContext);
  const destinationContext = useContext(DestinationContext);

  if (!sourceContext || !destinationContext) {
    console.error("SourceContext or DestinationContext is not provided!");
    return null;
  }

  const { source, setSource } = sourceContext;
  const { destination, setDestination } = destinationContext;
  const[distance,setDistance]=useState();

  useEffect(() => {
    if (source) {
      console.log(source);
    }
  }, [source]);

  const calculateDistance=() =>{
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
      {lat:source.lat,lng:source.lng},
      {lat:destination.lat,lng:destination.lng}
    )
    // console.log(dist*0.000621374);
    setDistance(dist*0.000621374*50.60934);
  }
  
  return (
    <div>
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">Ride with <span className="text-[#5277de]">glide</span></p>
      <InputItem type="source" />
      <InputItem type="destination" />
      <button 
      className="p-3 bg-black w-full mt-5 text-white rounded-lg bg-[#5277de] text-semibold"
      onClick={()=>calculateDistance()}
      >
        Search
      </button>
    </div>
    {distance ? < CarListOptions distance={distance} />
    :null}
    </div>
  );
}

export default SearchSection;
