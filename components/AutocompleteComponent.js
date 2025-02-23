"use client";
import { useState, useRef, useEffect } from "react";

const AutocompleteComponent = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded");
      return;
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onSelect(location);
        setInputValue(place.formatted_address); // Set input to selected place
      }
    });

  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter location"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "10px",
      }}
    />
  );
};

export default AutocompleteComponent;
