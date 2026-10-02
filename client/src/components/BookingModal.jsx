import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiUsers, FiCheckCircle, FiShield, FiHome, FiUserCheck } from 'react-icons/fi';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ destination, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { triggerNotification } = useNotification();

  const [bookingType, setBookingType] = useState('guide'); // 'guide' or 'homestay'
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !destination) return null;

  // Calculate pricing based on type & guests
  const baseRate = bookingType === 'guide' ? 800 : 1800;
  const totalPrice = baseRate * Math.ceil(guests / 2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentUser = user;
    if (!currentUser) {
      try {
        currentUser = await login('aarav@gmail.com', 'password123');
        triggerNotification({
          title: 'Auto-Authenticated',
          message: 'Logged in as Aarav Sharma for instant booking.',
          type: 'info'
        });
      } catch (err) {
        triggerNotification({ title: 'Auth Error', message: 'Please log in to make a booking.', type: 'error' });
        return;
      }
    }

    try {
      setSubmitting(true);
      const res = await API.post('/bookings', {
        destination_id: destination.id,
        type: bookingType,
        title: bookingType === 'guide' ? `${destination.title} Certified Local Guide` : `${destination.title} Tribal Eco Homestay`,
        booking_date: bookingDate,
        guests,
        total_price: totalPrice,
        special_requests: specialRequests
      });

      if (res.success) {
        triggerNotification({
          title: 'Booking Confirmed! 🎉',
          message: `Your ${bookingType === 'guide' ? 'Local Guide' : 'Homestay'} reservation is confirmed for ${bookingDate}.`,
          type: 'success'
        });
        onClose();
        navigate('/bookings');
      }
    } catch (err) {
      triggerNotification({ title: 'Booking Failed', message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <FiX className="text-xl" />
          </button>

          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Instant Booking Engine
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Book Experience in {destination.title}
            </h3>
          </div>

          {user ? (
            <div className="mb-5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <FiUserCheck className="text-base" /> Booking as <strong>{user.name}</strong> ({user.email})
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">Logged In</span>
            </div>
          ) : (
            <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-amber-800 dark:text-amber-300 block">Fast Demo Booking</span>
                <span className="text-[11px] text-slate-500">Auto-login enabled with Tourist demo account</span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await login('aarav@gmail.com', 'password123');
                    triggerNotification({ title: 'Welcome! 👋', message: 'Logged in as Aarav Sharma.', type: 'success' });
                  } catch (err) {
                    triggerNotification({ title: 'Error', message: err.message, type: 'error' });
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shrink-0 shadow-md shadow-emerald-600/20"
              >
                1-Click Sign In
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Service Type Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingType('guide')}
                className={`p-4 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition ${
                  bookingType === 'guide'
                    ? 'border-emerald-600 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FiShield className="text-2xl" />
                <span className="text-sm">Certified Local Guide</span>
                <span className="text-[10px] text-slate-500">₹800 / group</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('homestay')}
                className={`p-4 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition ${
                  bookingType === 'homestay'
                    ? 'border-emerald-600 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FiHome className="text-2xl" />
                <span className="text-sm">Authentic Homestay</span>
                <span className="text-[10px] text-slate-500">₹1,800 / night</span>
              </button>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <FiCalendar className="text-emerald-600" /> Select Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>

            {/* Guests Count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <FiUsers className="text-emerald-600" /> Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Special Requests / Notes
              </label>
              <textarea
                rows="2"
                placeholder="e.g. Preferred language, food preferences, early check-in"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              ></textarea>
            </div>

            {/* Total Price Breakdown */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Total Estimated Price</span>
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">₹{totalPrice}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">No advance payment required</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white font-bold shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {submitting ? 'Confirming Reservation...' : 'Confirm Booking'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
