"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import SourceContext from "../../context/SourceContext";
import DestinationContext from "../../context/DestinationContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    setPlaceholder(type === "source" ? "Pickup Location" : "Dropoff Location");
  }, [type]);

  // Function for autocomplete selection remains unchanged.
  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (placeDetails, status) => {
      if (
        status === "OK" &&
        placeDetails.geometry &&
        placeDetails.geometry.location
      ) {
        const locationData = {
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
          name: placeDetails.formatted_address,
          label: placeDetails.name,
        };
        if (type === "source") {
          setSource(locationData);
        } else {
          setDestination(locationData);
        }
      }
    });
  };

  // Updated function for "My Location" using Google Geolocation API.
  const handleMyLocation = async () => {
    // First, try using the browser's geolocation API with high accuracy.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Browser geolocation result:", position.coords);
          const myLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "My Location",
            label: "My Location",
          };
          setSource(myLocation);
          setValue(null);
        },
        async (error) => {
          console.error("Browser geolocation failed, falling back:", error);
          // Fallback: Use Google Geolocation API
          try {
            const response = await fetch(
              `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Try disabling IP-based fallback for a potentially better estimate
                body: JSON.stringify({ considerIp: false }),
              }
            );
            const data = await response.json();
            console.log("Google Geolocation API response:", data);
            if (data && data.location) {
              const myLocation = {
                lat: data.location.lat,
                lng: data.location.lng,
                name: "My Location",
                label: "My Location",
              };
              setSource(myLocation);
              setValue(null);
            } else {
              alert("Unable to retrieve location using Google Geolocation API");
            }
          } catch (err) {
            console.error("Error with Google Geolocation API:", err);
            alert("Error fetching your location. Please try again.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === "source" ? "/target.png" : "/destination.png"}
        width={15}
        height={15}
        alt="source image"
      />
      {type === "source" && (
        // Button for "My Location" as a dropdown option.
        <button
          onClick={handleMyLocation}
          className="bg-blue-500 text-white px-7 py-1 rounded"
        >
          Current Location
        </button>
      )}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
