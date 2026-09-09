import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FiMapPin, FiNavigation, FiCompass, FiCrosshair, 
  FiCheckCircle, FiClock, FiActivity 
} from 'react-icons/fi';
import API from '../services/api';
import MapComponent from '../components/MapComponent';
import { useNotification } from '../context/NotificationContext';

const InteractiveMap = () => {
  const [searchParams] = useSearchParams();
  const targetLat = searchParams.get('lat');
  const targetLng = searchParams.get('lng');

  const { triggerNotification } = useNotification();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [poiType, setPoiType] = useState('lodging');
  const [nearbyPois, setNearbyPois] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial destinations
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        const res = await API.get('/destinations');
        if (res.success) {
          setDestinations(res.destinations);
          if (targetLat && targetLng) {
            const matched = res.destinations.find(d => 
              Math.abs(d.latitude - parseFloat(targetLat)) < 0.05
            );
            if (matched) setSelectedDestination(matched);
          } else if (res.destinations.length > 0) {
            setSelectedDestination(res.destinations[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, [targetLat, targetLng]);

  // Request browser location
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          triggerNotification({
            title: 'GPS Location Detected',
            message: `Acquired coordinates (${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)})`,
            type: 'success'
          });
        },
        (err) => {
          // Fallback to Ranchi center
          const loc = { lat: 23.3441, lng: 85.3096 };
          setUserLocation(loc);
          triggerNotification({ title: 'Default Location', message: 'Set current location to Ranchi Center.', type: 'info' });
        }
      );
    }
  };

  // Calculate Route & Distance when destination changes
  useEffect(() => {
    if (selectedDestination) {
      const uLat = userLocation ? userLocation.lat : 23.3441;
      const uLng = userLocation ? userLocation.lng : 85.3096;

      API.get(`/places/route?originLat=${uLat}&originLng=${uLng}&destLat=${selectedDestination.latitude}&destLng=${selectedDestination.longitude}`)
        .then(res => {
          if (res.success) setRouteInfo(res.route);
        })
        .catch(err => console.warn(err));

      // Fetch nearby POIs
      API.get(`/places/nearby?lat=${selectedDestination.latitude}&lng=${selectedDestination.longitude}&type=${poiType}`)
        .then(res => {
          if (res.success) setNearbyPois(res.places);
        });
    }
  }, [selectedDestination, userLocation, poiType]);

  const poiFilters = [
    { id: 'lodging', label: 'Hotels' },
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'hospital', label: 'Hospitals' },
    { id: 'police', label: 'Police Stations' },
    { id: 'gas_station', label: 'Fuel Stations' },
    { id: 'train_station', label: 'Railway Stations' },
    { id: 'bus_station', label: 'Bus Stands' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Realtime Google Maps API
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Interactive Destination & Route Navigation Map
          </h1>
        </div>

        <button
          onClick={handleLocateUser}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2 hover:scale-105 transition"
        >
          <FiCrosshair className="text-lg" /> Locate My GPS Position
        </button>
      </div>

      {/* Main Map & Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[650px]">
        
        {/* Left Map View */}
        <div className="lg:col-span-8 h-full">
          <MapComponent
            destinations={destinations}
            userLocation={userLocation}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
            zoom={10}
          />
        </div>

        {/* Right Navigation & POI Panel */}
        <div className="lg:col-span-4 h-full glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto space-y-5">
          
          {/* Selected Destination Card */}
          {selectedDestination && (
            <div className="space-y-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">Selected Pin</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedDestination.title}</h3>
              <p className="text-xs text-slate-500">{selectedDestination.location_name}, {selectedDestination.district}</p>

              {/* Distance Matrix calculation display */}
              {routeInfo && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20">
                  <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 text-center">
                    <span className="block text-[10px] text-slate-400 font-semibold">Driving Distance</span>
                    <span className="text-sm font-extrabold text-emerald-600">{routeInfo.distanceText}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 text-center">
                    <span className="block text-[10px] text-slate-400 font-semibold">Estimated Time (ETA)</span>
                    <span className="text-sm font-extrabold text-blue-600">{routeInfo.durationText}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Nearby Places Filter Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Google Places POI Filters</h4>
            <div className="flex flex-wrap gap-1.5">
              {poiFilters.map((poi) => (
                <button
                  key={poi.id}
                  onClick={() => setPoiType(poi.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    poiType === poi.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {poi.label}
                </button>
              ))}
            </div>

            {/* Nearby POI list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 pt-2">
              {nearbyPois.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h6 className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</h6>
                    <span className="text-[10px] text-slate-400 block">{p.vicinity}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-500">⭐ {p.rating}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default InteractiveMap;
