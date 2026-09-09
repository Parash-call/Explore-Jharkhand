import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiMapPin, FiStar } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import DestinationCard from '../components/DestinationCard';
import SkeletonLoader from '../components/SkeletonLoader';

const Wishlist = () => {
  const { wishlist, loading } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500">
          Saved Collections
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
          <FiHeart className="fill-rose-500 text-rose-500" /> My Saved Destinations
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Your personal wishlist of waterfalls, wildlife safaris, and cultural landmarks in Jharkhand.
        </p>
      </div>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : wishlist.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <FiHeart className="mx-auto text-5xl text-slate-300 dark:text-slate-700 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500">Explore destinations and click the heart icon to save them for later.</p>
          <Link
            to="/destinations"
            className="inline-block px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
          >
            Explore Destinations Directory
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Wishlist;
