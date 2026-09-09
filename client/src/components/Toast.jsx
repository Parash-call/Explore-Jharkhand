import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { useNotification } from '../context/NotificationContext';

const Toast = () => {
  const { toast, closeToast } = useNotification();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const icons = {
    success: <FiCheckCircle class="text-emerald-500 text-xl" />,
    error: <FiAlertCircle class="text-rose-500 text-xl" />,
    info: <FiInfo class="text-blue-500 text-xl" />
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        class="fixed top-20 right-5 z-50 flex items-center gap-3 p-4 rounded-xl shadow-2xl glass-card border border-slate-200 dark:border-slate-800 max-w-md"
      >
        <div>{icons[toast.type] || icons.info}</div>
        <div class="flex-1 pr-2">
          <h4 class="text-sm font-semibold text-slate-900 dark:text-white">{toast.title}</h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={closeToast}
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <FiX class="text-base" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
