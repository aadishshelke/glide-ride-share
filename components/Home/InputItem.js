"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import SourceContext from "../../context/SourceContext";
import DestinationContext from "../../context/DestinationContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);

  useEffect(() => {
    setPlaceholder(type === "source" ? "Pickup Location" : "Dropoff Location");
  }, [type]);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (placeDetails, status) => {
      if (status === "OK" && placeDetails.geometry && placeDetails.geometry.location) {
        const newLocation = {
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
          name: placeDetails.formatted_address,
          label: placeDetails.name,
        };
        if (type === "source") {
          setSource(newLocation);
        } else {
          setDestination(newLocation);
        }
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === "source" ? "/target.png" : "/destination.png"}
        width={15}
        height={15}
        alt="source image"
      />
      <GooglePlacesAutocomplete
        // Prevent the component from trying to load the script again:
        useGoogleScript={false}
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
            DropdownIndicator: () => null,
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
