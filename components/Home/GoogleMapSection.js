import React, { useEffect, useState, useContext } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
} from "@react-google-maps/api";
import SourceContext from "../../context/SourceContext";
import DestinationContext from "../../context/DestinationContext";

function GoogleMapSection() {
  // FIX: useContext here, not direct destructuring from SourceContext
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: "100%",
    // Example for height: use a fixed pixel or a fraction of window.innerHeight
    height: window.innerWidth*0.44,
  };

  // Provide a default center as an object
  const [center, setCenter] = useState({
    lat: 18.5194,
    lng: 73.8557,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

  const onLoad = React.useCallback((mapInstance) => {
    // Fit to the default center
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  // If you are storing source/destination as an object,
  // check for `source?.lat` and `destination?.lat`.
  useEffect(() => {
    if (map && source?.lat) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });

      if (destination?.lat) {
        directionRoute();
      }
    }
  }, [source, map]);

  useEffect(() => {
    if (map && destination?.lat) {
      map.panTo({ lat: destination.lat, lng: destination.lng });
      setCenter({ lat: destination.lat, lng: destination.lng });

      if (source?.lat) {
        directionRoute();
      }
    }
  }, [destination, map]);

  // Make sure you're calling the directions service correctly
  const directionRoute = () => {
    if (!source?.lat || !destination?.lat) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirectionRoutePoints(result);
        } else {
          console.error("Directions request failed due to", status);
        }
      }
    );
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "4113717585f11867" }}
    >
      {/* Render marker for source if it has lat/lng */}
      {source?.lat && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/target.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Render marker for destination if it has lat/lng */}
      {destination?.lat && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/destination.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Only render DirectionsRenderer if we have a route */}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#000",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
