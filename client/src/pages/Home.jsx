import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSearch, FiMapPin, FiCompass, FiAward, FiSun, 
  FiNavigation, FiArrowRight, FiShield, FiHeart, FiStar 
} from 'react-icons/fi';
import API from '../services/api';
import DestinationCard from '../components/DestinationCard';
import WeatherCard from '../components/WeatherCard';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await API.get('/destinations');
        if (res.success) {
          setDestinations(res.destinations);
        }
      } catch (err) {
        console.error('Failed to load destinations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const categories = [
    { id: 'waterfall', title: 'Waterfalls', icon: '🌊', count: '98m Highest' },
    { id: 'wildlife', title: 'Wildlife Safaris', icon: '🐅', count: 'Project Tiger' },
    { id: 'temple', title: 'Spiritual Temples', icon: '🛕', count: '12 Jyotirlingas' },
    { id: 'festival', title: 'Tribal Festivals', icon: '🥁', count: 'Sarhul & Karma' },
    { id: 'food', title: 'Local Delicacies', icon: '🍲', count: 'Dhuska & Rugra' },
    { id: 'adventure', title: 'Hill Valleys', icon: '⛰️', count: 'Patratu Viewpoint' }
  ];

  const filteredDestinations = selectedCategory === 'all'
    ? destinations.slice(0, 6)
    : destinations.filter(d => d.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                Official SIH 2025 Platform • Code: SIH25032
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Discover the Land of <br />
                <span className="gradient-text">Waterfalls & Tribal Heritage</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Experience Jharkhand like never before. Real-time Google Maps navigation, live weather forecasts, algorithmic trip planner, and authentic tribal cultural discoveries.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center p-2 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
                  <FiMapPin className="text-emerald-600 text-xl ml-3 hidden sm:block" />
                  <input
                    type="text"
                    placeholder="Search Hundru Falls, Betla, Baidyanath Dham..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-105 transition flex items-center gap-2 shrink-0"
                  >
                    <FiSearch className="text-lg" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Quick Feature Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                <div className="flex items-center gap-2">
                  <FiCompass className="text-emerald-600 text-base" /> 100% Real Google APIs
                </div>
                <div className="flex items-center gap-2">
                  <FiShield className="text-emerald-600 text-base" /> Verified Local Guides
                </div>
                <div className="flex items-center gap-2">
                  <FiAward className="text-emerald-600 text-base" /> Smart Trip Planner
                </div>
              </div>
            </motion.div>

            {/* Right Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              <WeatherCard city="Ranchi" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Explore Categories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Curated Experiences Across Jharkhand
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-5 rounded-2xl glass-card border text-center transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-2 ${
                selectedCategory === cat.id
                  ? 'border-emerald-600 bg-emerald-600/10 shadow-lg shadow-emerald-600/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cat.title}</h4>
              <span className="text-[10px] text-slate-500 font-semibold">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Top Destinations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Must-Visit Places in Jharkhand
            </h2>
          </div>
          <Link
            to="/destinations"
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-3 transition"
          >
            <span>View All Destinations</span>
            <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </section>

      {/* Smart Planner Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
              Algorithmic Travel Planner
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Plan Your Customized Jharkhand Itinerary in Seconds
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Enter your budget, preferred days, starting location, and interests. Our smart algorithm generates day-by-day itineraries, exact cost estimations, optimal driving routes, and weather-adjusted packing checklists.
            </p>
            <div className="pt-2">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-900 font-extrabold shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-105 transition"
              >
                <FiCompass className="text-lg" />
                Launch Smart Planner
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
