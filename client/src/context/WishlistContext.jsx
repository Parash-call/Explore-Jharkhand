import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    try {
      setLoading(true);
      const data = await API.get('/wishlist');
      setWishlist(data.wishlist || []);
    } catch (error) {
      console.warn('Failed to fetch wishlist:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (destinationId) => {
    if (!user) return false;
    try {
      const res = await API.post('/wishlist/toggle', { destination_id: destinationId });
      await fetchWishlist();
      return res.isWishlisted;
    } catch (error) {
      console.error('Wishlist toggle error:', error.message);
      throw error;
    }
  };

  const isWishlisted = (destinationId) => {
    return wishlist.some(item => item.id === destinationId || item.destination_id === destinationId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isWishlisted, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
