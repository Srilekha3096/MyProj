import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ locationData }) => {
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    // Update map center when locationData changes
    setMapCenter([locationData.lat, locationData.lng]);
  }, [locationData]);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationData?.lat !== undefined && locationData?.lng !== undefined && (
        <Marker position={[locationData?.lat, locationData?.lng]}>
          <Popup>
            A popup for your location. <br /> Lat: {locationData?.lat}, Lng: {locationData?.lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
