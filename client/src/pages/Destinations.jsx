import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiGrid } from 'react-icons/fi';
import API from '../services/api';
import DestinationCard from '../components/DestinationCard';
import SkeletonLoader from '../components/SkeletonLoader';

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [district, setDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      let query = `/destinations?category=${category}&district=${district}&sort=${sortBy}`;
      if (search) {
        query += `&search=${encodeURIComponent(search)}`;
      }
      const res = await API.get(query);
      if (res.success) {
        setDestinations(res.destinations);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [category, district, sortBy, search]);

  const categories = [
    { id: 'all', name: 'All Category' },
    { id: 'waterfall', name: 'Waterfalls' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'temple', name: 'Temples' },
    { id: 'festival', name: 'Festivals' },
    { id: 'food', name: 'Local Food' },
    { id: 'adventure', name: 'Adventure & Valleys' }
  ];

  const districts = ['all', 'Ranchi', 'Deoghar', 'Palamu', 'Ramgarh'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Jharkhand Tourism Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Explore Destinations & Attractions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Filter by category, district, rating, or search directly for your next adventure.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by name, district, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* District Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Districts</option>
              {districts.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d} District</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="default">Sort by Default</option>
              <option value="rating">Top Rated</option>
              <option value="price">Entry Fee (Low to High)</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setSearchParams({ category: cat.id, search });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                category === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Grid Results */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : destinations.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <FiMapPin className="mx-auto text-4xl text-slate-400 mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Destinations Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Destinations;
