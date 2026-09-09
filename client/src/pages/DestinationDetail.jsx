import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMapPin, FiStar, FiClock, FiCalendar, FiDollarSign, 
  FiHeart, FiCheckCircle, FiShare2, FiMessageSquare, 
  FiShield, FiNavigation 
} from 'react-icons/fi';
import API from '../services/api';
import WeatherCard from '../components/WeatherCard';
import MapComponent from '../components/MapComponent';
import BookingModal from '../components/BookingModal';
import ReviewModal from '../components/ReviewModal';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { triggerNotification } = useNotification();

  const [destination, setDestination] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('lodging');

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/destinations/${id}`);
      if (res.success) {
        setDestination(res.destination);
        // Fetch nearby POIs
        fetchNearby(res.destination.latitude, res.destination.longitude, 'lodging');
      }
    } catch (err) {
      console.error(err);
      triggerNotification({ title: 'Error', message: 'Failed to load destination details.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchNearby = async (lat, lng, type) => {
    try {
      const res = await API.get(`/places/nearby?lat=${lat}&lng=${lng}&type=${type}`);
      if (res.success) {
        setNearbyPlaces(res.places);
      }
    } catch (err) {
      console.warn('Nearby places error:', err);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse space-y-6">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl w-full"></div>
        <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Destination Not Found</h2>
        <button onClick={() => navigate('/destinations')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl">
          Back to Directory
        </button>
      </div>
    );
  }

  const saved = isWishlisted(destination.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <FiMapPin /> {destination.location_name}, {destination.district} District
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-1">
            {destination.title}
          </h1>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={async () => {
              if (!user) return navigate('/login');
              await toggleWishlist(destination.id);
            }}
            className="p-3 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:text-rose-500 transition"
            title="Wishlist"
          >
            <FiHeart className={`text-xl ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white font-extrabold shadow-lg shadow-emerald-600/30 hover:scale-105 transition"
          >
            Book Guide / Homestay
          </button>
        </div>
      </div>

      {/* Main Hero Banner */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-slate-800">
        <img
          src={destination.image_url}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 flex items-center gap-1">
              <FiStar className="fill-slate-900" /> {parseFloat(destination.avg_rating || 4.8).toFixed(1)} ({destination.review_count || 0} Reviews)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              {destination.category.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => navigate(`/map?lat=${destination.latitude}&lng=${destination.longitude}`)}
            className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 border border-white/30 transition"
          >
            <FiNavigation /> View on Google Map
          </button>
        </div>
      </div>

      {/* Details Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Info & Description */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
            <div>
              <span className="block text-xs text-slate-500 font-semibold flex items-center gap-1 mb-1">
                <FiClock className="text-emerald-600" /> Opening Hours
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{destination.opening_hours}</span>
            </div>

            <div>
              <span className="block text-xs text-slate-500 font-semibold flex items-center gap-1 mb-1">
                <FiDollarSign className="text-emerald-600" /> Entry Fee
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {parseFloat(destination.entry_fee) === 0 ? 'Free Entry' : `₹${destination.entry_fee} / person`}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="block text-xs text-slate-500 font-semibold flex items-center gap-1 mb-1">
                <FiCalendar className="text-emerald-600" /> Best Time to Visit
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{destination.best_time}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">About Destination</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {destination.description}
            </p>
          </div>

          {/* Nearby Google Places API Section */}
          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Google Places API</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nearby Amenities & Hotels</h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'lodging', label: 'Hotels' },
                  { id: 'restaurant', label: 'Food' },
                  { id: 'hospital', label: 'Hospitals' },
                  { id: 'gas_station', label: 'Fuel' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      fetchNearby(destination.latitude, destination.longitude, t.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeTab === t.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearbyPlaces.map((poi) => (
                <div key={poi.id} className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{poi.name}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{poi.vicinity}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                    ⭐ {poi.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tourist Reviews</h3>
              <button
                onClick={() => {
                  if (!user) return navigate('/login');
                  setReviewModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/30 hover:scale-105 transition"
              >
                Write Review
              </button>
            </div>

            {destination.reviews && destination.reviews.length > 0 ? (
              <div className="space-y-4">
                {destination.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                          {rev.user_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">{rev.user_name}</h5>
                          <span className="text-[10px] text-slate-400">Verified Traveler</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                        <FiStar className="fill-amber-400" /> {rev.rating} / 5
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No reviews yet. Be the first to share your experience!</p>
            )}
          </div>

        </div>

        {/* Right Sidebar: Live Weather & Mini Map */}
        <div className="lg:col-span-4 space-y-6">
          
          <WeatherCard city={destination.district} />

          <div className="h-[300px]">
            <MapComponent
              destinations={[destination]}
              selectedDestination={destination}
              zoom={12}
            />
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        destination={destination}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Review Modal */}
      <ReviewModal
        destination={destination}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onReviewAdded={fetchDestination}
      />

    </div>
  );
};

export default DestinationDetail;
