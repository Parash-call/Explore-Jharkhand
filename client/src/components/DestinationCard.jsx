import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiHeart, FiClock, FiDollarSign } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const DestinationCard = ({ destination }) => {
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { triggerNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  const saved = isWishlisted(destination.id);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      triggerNotification({ title: 'Authentication Required', message: 'Please log in to add items to your wishlist.', type: 'info' });
      navigate('/login');
      return;
    }

    try {
      const isNowSaved = await toggleWishlist(destination.id);
      triggerNotification({
        title: isNowSaved ? 'Saved to Wishlist' : 'Removed from Wishlist',
        message: `${destination.title} has been ${isNowSaved ? 'added to' : 'removed from'} your saved wishlist.`,
        type: 'success'
      });
    } catch (err) {
      triggerNotification({ title: 'Error', message: 'Failed to update wishlist.', type: 'error' });
    }
  };

  const categoryColors = {
    waterfall: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    wildlife: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    temple: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    festival: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    food: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    adventure: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl overflow-hidden glass-card shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-slate-200 dark:border-slate-800"
    >
      {/* Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={destination.image_url}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Category Pill */}
        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border ${categoryColors[destination.category] || categoryColors.waterfall}`}>
          {destination.category}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 shadow-lg transition hover:scale-110"
        >
          <FiHeart className={`text-lg ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-400 font-bold text-xs">
          <FiStar className="fill-amber-400 text-sm" />
          <span>{parseFloat(destination.avg_rating || 4.5).toFixed(1)}</span>
          <span className="text-slate-300 text-[10px]">({destination.review_count || 0})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            <FiMapPin className="text-sm" />
            <span>{destination.district}, {destination.state === 'tamilnadu' ? 'Tamil Nadu' : 'Jharkhand'}</span>
          </div>

          <Link to={`/destinations/${destination.id}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-1">
              {destination.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Footer Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <FiDollarSign className="text-emerald-600 font-bold text-sm" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {parseFloat(destination.entry_fee) === 0 ? 'Free Entry' : `₹${destination.entry_fee}`}
            </span>
          </div>

          <Link
            to={`/destinations/${destination.id}`}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold hover:bg-emerald-600 hover:text-white transition"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
