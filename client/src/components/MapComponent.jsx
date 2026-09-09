import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FiMapPin, FiStar } from 'react-icons/fi';

// Fix default leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to center map on selection change
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const MapComponent = ({ 
  destinations = [], 
  userLocation = null, 
  selectedDestination = null, 
  onSelectDestination, 
  center = [23.3441, 85.3096], 
  zoom = 9 
}) => {
  const mapCenter = selectedDestination
    ? [parseFloat(selectedDestination.latitude), parseFloat(selectedDestination.longitude)]
    : (userLocation ? [userLocation.lat, userLocation.lng] : center);

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        
        {/* OpenStreetMap / Google hybrid style tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Current Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              <div className="text-center font-bold">
                <span className="text-emerald-600 text-xs uppercase block">Your Current Location</span>
                <span className="text-sm">Ranchi Highway Hub</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Markers */}
        {destinations.map((dest) => (
          <Marker
            key={dest.id}
            position={[parseFloat(dest.latitude), parseFloat(dest.longitude)]}
            eventHandlers={{
              click: () => {
                if (onSelectDestination) onSelectDestination(dest);
              }
            }}
          >
            <Popup>
              <div className="max-w-xs p-1">
                <img
                  src={dest.image_url}
                  alt={dest.title}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{dest.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{dest.district}, Jharkhand</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t text-xs">
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    <FiStar className="fill-amber-400" /> {parseFloat(dest.avg_rating || 4.5).toFixed(1)}
                  </span>
                  <span className="font-bold text-emerald-600">
                    {parseFloat(dest.entry_fee) === 0 ? 'Free' : `₹${dest.entry_fee}`}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default MapComponent;
