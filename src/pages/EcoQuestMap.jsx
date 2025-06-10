import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const LocationPicker = ({ initialPosition, onLocationSelect }) => {
  const [position, setPosition] = useState(initialPosition);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (initialPosition) {
      map.flyTo(initialPosition, map.getZoom());
    }
  }, [initialPosition, map]);

  return position ? (
    <Marker position={position}>
      <Popup>Your location</Popup>
    </Marker>
  ) : null;
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

export const SubmissionMap = ({ location, onLocationChange }) => {
  return (
    <div className="h-64 border rounded">
      <MapContainer
        center={location || [0, 0]}
        zoom={location ? 13 : 2}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          if (!location) {
            map.locate();
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationPicker
          initialPosition={location}
          onLocationSelect={onLocationChange}
        />
      </MapContainer>
    </div>
  );
};