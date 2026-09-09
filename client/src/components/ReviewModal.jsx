import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiCamera } from 'react-icons/fi';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const ReviewModal = ({ destination, isOpen, onClose, onReviewAdded }) => {
  const { user } = useAuth();
  const { triggerNotification } = useNotification();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !destination) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      triggerNotification({ title: 'Auth Error', message: 'Please log in to add a review.', type: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('destination_id', destination.id);
      formData.append('rating', rating);
      formData.append('comment', comment);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await API.post('/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.success) {
        triggerNotification({
          title: 'Review Posted! ⭐',
          message: 'Thank you for sharing your feedback with fellow travelers.',
          type: 'success'
        });
        if (onReviewAdded) onReviewAdded();
        onClose();
      }
    } catch (err) {
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
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
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <FiX className="text-xl" />
          </button>

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Community Review
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Rate & Review {destination.title}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Star Rating selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition hover:scale-125 focus:outline-none"
                  >
                    <FiStar
                      className={`text-3xl ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Your Experience & Advice
              </label>
              <textarea
                required
                rows="4"
                placeholder="Share details of your visit, road conditions, local food, or best timings..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              ></textarea>
            </div>

            {/* Optional Image Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <FiCamera className="text-emerald-600" /> Attach Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950 dark:file:text-emerald-300 hover:file:bg-emerald-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {submitting ? 'Publishing Review...' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewModal;
