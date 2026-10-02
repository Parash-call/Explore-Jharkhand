import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiCalendar, FiUsers, FiDollarSign, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Bookings = () => {
  const { triggerNotification } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get('/bookings');
      if (res.success) {
        setBookings(res.bookings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking reservation?')) return;
    try {
      const res = await API.put(`/bookings/${id}/cancel`);
      if (res.success) {
        triggerNotification({
          title: 'Booking Cancelled',
          message: 'Your reservation has been cancelled.',
          type: 'info'
        });
        fetchBookings();
      }
    } catch (err) {
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Reservation Management
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
          <FiBriefcase className="text-emerald-600" /> My Guide & Homestay Bookings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage your active reservations for certified local guides and authentic tribal homestays.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <FiBriefcase className="mx-auto text-5xl text-slate-300 dark:text-slate-700 mb-3" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Active Bookings</h3>
          <p className="text-xs text-slate-500 mt-1">You haven't booked any guide or homestay yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <img
                  src={booking.destination_image || 'https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280'}
                  alt={booking.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                    }`}>
                      {booking.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400">• {booking.type.toUpperCase()}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{booking.title}</h4>
                  <p className="text-xs text-slate-500">{booking.destination_title} ({booking.location_name})</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <span className="flex items-center gap-1"><FiCalendar className="text-emerald-600" /> {booking.booking_date}</span>
                    <span className="flex items-center gap-1"><FiUsers className="text-emerald-600" /> {booking.guests} Guests</span>
                    <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white"><FiDollarSign className="text-emerald-600" /> Total: ₹{booking.total_price}</span>
                  </div>
                </div>
              </div>

              {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="px-4 py-2 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-500 hover:text-white transition flex items-center gap-1.5 shrink-0"
                >
                  <FiXCircle /> Cancel Reservation
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Bookings;
